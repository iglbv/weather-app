import axios from 'axios';
import { AppDataSource } from '../data-source';
import { WeatherRecord } from '../entities/weather.entity';

export const getWeather = async (city: string) => {
    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric&lang=ru`
        );

        if (AppDataSource.isInitialized) {
            const repo = AppDataSource.getRepository(WeatherRecord);
            await repo.save({
                city,
                data: response.data,
                timestamp: new Date()
            });
        }

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            throw new Error('Город не найден');
        }
        throw new Error('Ошибка при получении данных о погоде');
    }
};

export const getWeatherHistory = async () => {
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }
    const repo = AppDataSource.getRepository(WeatherRecord);
    return repo.find({
        order: { timestamp: 'DESC' },
        take: 10
    });
};