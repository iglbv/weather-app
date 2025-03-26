import React from 'react';
import { WeatherListStyled } from '../styles';
import WeatherDisplay from './WeatherDisplay';
import { CityWeather } from '../types/weather';

interface WeatherListProps {
    cities: CityWeather[];
}

const WeatherList: React.FC<WeatherListProps> = ({ cities }) => {
    return (
        <WeatherListStyled>
            {cities.map((city) => (
                <WeatherDisplay
                    key={city.id}
                    weather={city.weather}
                />
            ))}
        </WeatherListStyled>
    );
};

export default WeatherList;