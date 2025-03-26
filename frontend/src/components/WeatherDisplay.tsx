import React from 'react';
import {
    WeatherItem,
    WeatherIcon,
    WeatherDetail,
    WeatherEmoji,
    DeleteButton
} from '../styles';
import { WeatherData } from '../types/weather';

interface WeatherDisplayProps {
    weather: WeatherData;
    onRemove: () => void;
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
    const localTime = new Date(now.getTime() + timezoneOffset * 1000);
    return localTime.toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'UTC'
    });
};

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weather, onRemove }) => {
    const weatherData = weather.weather[0];
    const emoji = getWeatherEmoji(weatherData.id);
    const localTime = formatLocalTime(weather.timezone);

    return (
        <WeatherItem weather={weather}>
            <DeleteButton onClick={onRemove} aria-label="Удалить город">
                ×
            </DeleteButton>

            <WeatherIcon>
                <WeatherEmoji>{emoji}</WeatherEmoji>
                <img
                    src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
                    alt={weatherData.description}
                />
            </WeatherIcon>

            <h2>{weather.name}</h2>

            <WeatherDetail>
                <WeatherEmoji>🕒</WeatherEmoji>
                <span>Местное время: {localTime}</span>
            </WeatherDetail>

            <WeatherDetail>
                <WeatherEmoji>🌡️</WeatherEmoji>
                <span>
                    {Math.round(weather.main.temp)}°C
                    (ощущается как {Math.round(weather.main.feels_like)}°C)
                </span>
            </WeatherDetail>

            <WeatherDetail>
                <WeatherEmoji>{emoji}</WeatherEmoji>
                <span>{weatherData.description}</span>
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