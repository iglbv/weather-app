import { DataSource } from 'typeorm';
import { WeatherRecord } from './entities/weather.entity';

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "postgres",
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USER || "weather_user",
    password: process.env.DB_PASSWORD || "weather_pass",
    database: process.env.DB_NAME || "weather_db",
    entities: [WeatherRecord],
    synchronize: true,
    logging: false
});