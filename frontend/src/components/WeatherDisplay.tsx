import React from 'react';
import {
    WeatherItem,
    WeatherIcon,
    WeatherDetail,
    WeatherEmoji
} from '../styles';
import { WeatherData } from '../types/weather';

interface WeatherDisplayProps {
    weather: WeatherData;
}

const getWeatherEmoji = (weatherCode: number) => {
    if (weatherCode >= 200 && weatherCode < 300) return '⛈️';
    if (weatherCode >= 300 && weatherCode < 500) return '🌧️';
    if (weatherCode >= 500 && weatherCode < 600) return '🌧️';
    if (weatherCode >= 600 && weatherCode < 700) return '❄️';
    if (weatherCode >= 700 && weatherCode < 800) return '🌫️';
    if (weatherCode === 800) return '☀️';
    if (weatherCode > 800) return '☁️';
    return '🌈';
};

const formatLocalTime = (timezoneOffset: number) => {
    const now = new Date();
    // Преобразуем смещение из секунд в миллисекунды
    const localTime = new Date(now.getTime() + timezoneOffset * 1000);
    return localTime.toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'UTC'
    });
};

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weather }) => {
    const weatherCode = weather.weather[0].id;
    const emoji = getWeatherEmoji(weatherCode);
    const localTime = formatLocalTime(weather.timezone);

    return (
        <WeatherItem weather={weather}>
            <WeatherIcon>
                <WeatherEmoji>{emoji}</WeatherEmoji>
                <img
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt={weather.weather[0].description}
                    style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
                />
            </WeatherIcon>
            <h2>{weather.name}</h2>
            <WeatherDetail>
                <WeatherEmoji>🕒</WeatherEmoji>
                <span>Местное время: {localTime}</span>
            </WeatherDetail>
            <WeatherDetail>
                <WeatherEmoji>{emoji}</WeatherEmoji>
                <span>{weather.weather[0].description}</span>
            </WeatherDetail>
            <WeatherDetail>
                <WeatherEmoji>💨</WeatherEmoji>
                <span>{weather.wind.speed} м/с</span>
            </WeatherDetail>
            <WeatherDetail>
                <WeatherEmoji>💧</WeatherEmoji>
                <span>{weather.main.humidity}% влажности</span>
            </WeatherDetail>
        </WeatherItem>
    );
};

export default WeatherDisplay;