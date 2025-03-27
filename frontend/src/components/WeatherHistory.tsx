import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { WeatherDetail, WeatherEmoji } from '../styles';

interface HistoryItem {
    id: number;
    city: string;
    data: {
        main: {
            temp: number;
        };
        weather: Array<{
            description: string;
            id: number;
        }>;
    };
    timestamp: string;
}

const WeatherHistory: React.FC = () => {
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [loading, setLoading] = useState(true);

    const getWeatherEmoji = (weatherId: number) => {
        if (weatherId >= 200 && weatherId < 300) return '⛈️';
        if (weatherId >= 300 && weatherId < 500) return '🌧️';
        if (weatherId >= 500 && weatherId < 600) return '🌧️';
        if (weatherId >= 600 && weatherId < 700) return '❄️';
        if (weatherId === 800) return '☀️';
        if (weatherId > 800) return '☁️';
        return '🌈';
    };

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const { data } = await axios.get<HistoryItem[]>(
                    'http://localhost:5000/api/weather/history/all'
                );
                setHistory(data);
            } catch (err) {
                console.error('Ошибка загрузки истории:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, []);

    if (loading) return <div>Загрузка истории...</div>;

    return (
        <div style={{ marginTop: '2rem' }}>
            <h3>Последние запросы:</h3>
            {history.length === 0 ? (
                <p>История запросов пока пуста</p>
            ) : (
                history.map((item) => {
                    const weather = item.data.weather[0];
                    return (
                        <WeatherDetail key={item.id}>
                            <span>{new Date(item.timestamp).toLocaleTimeString('ru-RU')}</span>
                            <strong>{item.city}</strong>
                            <span>{Math.round(item.data.main.temp)}°C</span>
                            <WeatherEmoji>
                                {getWeatherEmoji(weather.id)}
                            </WeatherEmoji>
                        </WeatherDetail>
                    );
                })
            )}
        </div>
    );
};

export default WeatherHistory;