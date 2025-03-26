import axios from 'axios';
import dotenv from 'dotenv';

// Загружаем переменные окружения
dotenv.config();

const weatherCache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 15 * 60 * 1000; // 15 минут

export const getWeather = async (city: string) => {
    const cached = weatherCache.get(city);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        return cached.data;
    }

    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric&lang=ru`
        );
        weatherCache.set(city, { data: response.data, timestamp: Date.now() });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(
                error.response?.status === 404
                    ? 'Город не найден'
                    : 'Ошибка при получении данных о погоде'
            );
        }
        throw new Error('Неизвестная ошибка');
    }
};