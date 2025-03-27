import { Router } from 'express';
import { getWeather, getWeatherHistory } from '../services/weatherService';

const router = Router();

router.get('/:city', async (req, res) => {
    try {
        const { city } = req.params;
        const weather = await getWeather(city);
        res.json(weather);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

router.get('/history/all', async (req, res) => {
    try {
        const history = await getWeatherHistory();
        res.json(history);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch history' });
    }
});

export default router;