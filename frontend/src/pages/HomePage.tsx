import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import WeatherForm from '../components/WeatherForm';
import WeatherList from '../components/WeatherList';
import { CityWeather, WeatherData } from '../types/weather';
import { AppContainer, Title, RefreshButton, ErrorText } from '../styles';

interface ExtendedWeatherData extends WeatherData {
    lastUpdated: string;
}

const HomePage: React.FC = () => {
    const [cities, setCities] = useState<CityWeather[]>(() => {
        const savedCities = localStorage.getItem('weatherCities');
        return savedCities ? JSON.parse(savedCities) : [];
    });
    const [error, setError] = useState<string | null>(null);
    const [isRefreshing, setIsRefreshing] = useState(false);

    useEffect(() => {
        localStorage.setItem('weatherCities', JSON.stringify(cities));
    }, [cities]);

    const fetchWeather = async (city: string): Promise<ExtendedWeatherData | null> => {
        try {
            const response = await axios.get<WeatherData>(
                `http://localhost:5000/api/weather/${city}`
            );
            return {
                ...response.data,
                lastUpdated: new Date().toISOString()
            };
        } catch (err) {
            console.error('Error fetching weather:', err);
            setError('Город не найден');
            return null;
        }
    };

    const addCity = async (city: string) => {
        const normalizedCity = city.trim().toLowerCase();

        if (cities.some(c => c.name.toLowerCase() === normalizedCity)) {
            setError('Этот город уже есть в списке');
            return;
        }

        setError(null);
        const weatherData = await fetchWeather(city);

        if (weatherData) {
            setCities(prev => [
                ...prev,
                {
                    id: uuidv4(),
                    name: city.trim(),
                    weather: weatherData
                }
            ]);
        }
    };

    const removeCity = (id: string) => {
        setCities(prev => prev.filter(city => city.id !== id));
    };

    const refreshWeather = async () => {
        setIsRefreshing(true);
        try {
            const updatedCities = await Promise.all(
                cities.map(async city => {
                    const weatherData = await fetchWeather(city.name);
                    return weatherData ? { ...city, weather: weatherData } : city;
                })
            );
            setCities(updatedCities);
        } catch (err) {
            console.error('Error refreshing weather:', err);
            setError('Ошибка при обновлении данных');
        } finally {
            setIsRefreshing(false);
        }
    };

    useEffect(() => {
        const shouldRefresh = cities.some(city => {
            if (!('lastUpdated' in city.weather)) return true;
            const lastUpdated = (city.weather as ExtendedWeatherData).lastUpdated;
            return Date.now() - new Date(lastUpdated).getTime() > 15 * 60 * 1000;
        });

        if (shouldRefresh && cities.length > 0) {
            refreshWeather();
        }
    }, []);

    return (
        <AppContainer>
            <Title>Погода</Title>
            <WeatherForm onAddCity={addCity} />
            {error && <ErrorText>{error}</ErrorText>}
            <RefreshButton
                onClick={refreshWeather}
                disabled={isRefreshing || cities.length === 0}
            >
                {isRefreshing ? 'Обновление...' : 'Обновить все города'}
            </RefreshButton>
            <WeatherList cities={cities} onRemoveCity={removeCity} />
        </AppContainer>
    );
};

export default HomePage;