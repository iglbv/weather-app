import React, { useState } from 'react';
import { WeatherFormStyled, WeatherInput, WeatherButton } from '../styles';

interface WeatherFormProps {
    onAddCity: (city: string) => void;
}

const WeatherForm: React.FC<WeatherFormProps> = ({ onAddCity }) => {
    const [city, setCity] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (city.trim()) {
            onAddCity(city);
            setCity('');
        }
    };

    return (
        <WeatherFormStyled onSubmit={handleSubmit}>
            <WeatherInput
                type="text"
                placeholder="Введите город"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                aria-label="Название города"
            />
            <WeatherButton type="submit">
                Добавить город
            </WeatherButton>
        </WeatherFormStyled>
    );
};

export default WeatherForm;