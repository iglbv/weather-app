import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { ThemeProvider } from '@emotion/react';
import WeatherForm from './components/WeatherForm';
import WeatherList from './components/WeatherList';
import {
  AppContainer,
  ErrorText,
  RefreshButton,
  Title,
  GlobalStyles,
  theme
} from './styles';
import { CityWeather, WeatherData } from './types/weather';

const App: React.FC = () => {
  const [cities, setCities] = useState<CityWeather[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (city: string): Promise<WeatherData | null> => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/weather/${city}`
      );
      return response.data;
    } catch (err) {
      setError('Город не найден');
      return null;
    }
  };

  const addCity = async (city: string) => {
    const weatherData = await fetchWeather(city);
    if (weatherData) {
      const newCity: CityWeather = {
        id: uuidv4(),
        name: city,
        weather: weatherData,
      };
      setCities([...cities, newCity]);
      setError(null);
    }
  };

  const refreshWeather = async () => {
    const updatedCities = await Promise.all(
      cities.map(async (city) => {
        const weatherData = await fetchWeather(city.name);
        return weatherData ? { ...city, weather: weatherData } : city;
      })
    );
    setCities(updatedCities);
  };

  return (
    <ThemeProvider theme={theme.light}>
      <GlobalStyles>
        <AppContainer>
          <Title>Погодное Приложение</Title>
          <WeatherForm onAddCity={addCity} />
          {error && <ErrorText>{error}</ErrorText>}
          <RefreshButton onClick={refreshWeather}>
            Обновить все города
          </RefreshButton>
          <WeatherList cities={cities} />
        </AppContainer>
      </GlobalStyles>
    </ThemeProvider>
  );
};

export default App;