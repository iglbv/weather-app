import React from 'react';
import { WeatherListStyled } from '../styles';
import WeatherDisplay from './WeatherDisplay';
import { CityWeather } from '../types/weather';

interface WeatherListProps {
    cities: CityWeather[];
    onRemoveCity: (id: string) => void;
}

const WeatherList: React.FC<WeatherListProps> = ({ cities, onRemoveCity }) => {
    return (
        <WeatherListStyled>
            {cities.map((city) => (
                <WeatherDisplay
                    key={city.id}
                    weather={city.weather}
                    onRemove={() => onRemoveCity(city.id)}
                />
            ))}
        </WeatherListStyled>
    );
};

export default WeatherList;