import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { HistoryContainer, WeatherDetail, WeatherEmoji } from '../styles';

interface HistoryItem {
    id: number;
    city: string;
    data: {
        main: {
            temp: number;
        };
        weather: Array<{
            id: number;
        }>;
    };
    timestamp: string;
}

const HistoryPage: React.FC = () => {
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

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
                navigate('/');
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, [navigate]);

    if (loading) return <div>Загрузка истории...</div>;

    return (
        <HistoryContainer>
            <h2>История запросов</h2>
            {history.length === 0 ? (
                <p>История запросов пока пуста</p>
            ) : (
                <div style={{ display: 'grid', gap: '1rem' }}>
                    {history.map((item) => {
                        const weather = item.data.weather[0];
                        return (
                            <WeatherDetail key={item.id}>
                                <span style={{ minWidth: '80px' }}>
                                    {new Date(item.timestamp).toLocaleTimeString('ru-RU', {
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </span>
                                <strong style={{ flex: 1 }}>{item.city}</strong>
                                <span style={{ minWidth: '60px', textAlign: 'right' }}>
                                    {Math.round(item.data.main.temp)}°C
                                </span>
                                <WeatherEmoji>
                                    {getWeatherEmoji(weather.id)}
                                </WeatherEmoji>
                            </WeatherDetail>
                        );
                    })}
                </div>
            )}
        </HistoryContainer>
    );
};

export default HistoryPage;