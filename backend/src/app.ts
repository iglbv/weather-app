import express from 'express';
import cors from 'cors';
import weatherRoutes from './routes/weather';
import { DataSource } from 'typeorm';
import { WeatherRecord } from './entities/weather.entity';

const app = express();
const PORT = 5000;

const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [WeatherRecord],
    synchronize: true,
});

AppDataSource.initialize()
    .then(() => console.log('Database connected'))
    .catch(err => console.error('DB connection error:', err));

app.use(cors());
app.use(express.json());
app.use('/api/weather', weatherRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});