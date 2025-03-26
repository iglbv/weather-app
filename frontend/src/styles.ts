import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { WeatherData } from './types/weather';

// ===== Типы =====
type ThemeColors = {
  background: string;
  text: string;
  primary: string;
  secondary: string;
  accent: string;
  cardBg: string;
  border: string;
  error: string;
};

// ===== Цветовая тема =====
export const theme = {
  light: {
    background: '#F8F9FA',
    text: '#212529',
    primary: '#4361EE',
    secondary: '#3A0CA3',
    accent: '#F72585',
    cardBg: '#FFFFFF',
    border: '#E9ECEF',
    error: '#D00000',
  }
};

// ===== Расширение темы Emotion =====
declare module '@emotion/react' {
  export interface Theme extends ThemeColors { }
}

// ===== Интерфейсы пропсов =====
interface WeatherItemProps {
  weather?: WeatherData;
  children?: React.ReactNode;
}

interface WeatherDetailProps {
  children?: React.ReactNode;
}

// ===== Анимации =====
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// ===== Глобальные стили =====
export const GlobalStyles = styled.div`
  * {
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  body {
    margin: 0;
    min-height: 100vh;
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    font-family: 'Montserrat', sans-serif;
  }

  h1, h2, h3 {
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    margin: 0;
  }

  button {
    cursor: pointer;
    transition: all 0.2s ease;
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
`;

// ===== Градиенты для температур =====
const getTempGradient = (temp: number) => {
  if (temp < 0) return 'linear-gradient(135deg, #0061ff, #0040a8)'; // Более темный синий
  if (temp < 10) return 'linear-gradient(135deg, #00a86b, #007a4d)'; // Более темный зеленый
  if (temp < 20) return 'linear-gradient(135deg, #ff8c00, #cc7000)'; // Более темный оранжевый
  return 'linear-gradient(135deg, #ff3d3d, #cc0000)'; // Более темный красный
};

// ===== Компоненты =====
export const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  position: relative;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  background: linear-gradient(90deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.accent});
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-align: center;
`;

export const WeatherFormStyled = styled.form`
  display: flex;
  gap: 1rem;
  max-width: 600px;
  margin: 0 auto 2rem;
  animation: ${fadeIn} 0.5s ease;
`;

export const WeatherInput = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  border: 2px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.cardBg};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}33;
  }
`;

export const WeatherButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  border: none;
  background: ${({ theme }) => theme.primary};
  color: white;
  font-weight: 600;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: ${({ theme }) => theme.secondary};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const WeatherListStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

export const WeatherItem = styled.div<WeatherItemProps>`
  background: ${({ theme, weather }) =>
    weather ? getTempGradient(weather.main.temp) : theme.cardBg};
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 1px solid ${({ theme }) => theme.border};
  color: white; // Всегда белый текст на градиенте
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3); // Добавим тень для лучшей читаемости
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: white;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3); // Более выраженная тень для заголовка
  }
`;

export const WeatherIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  line-height: 1;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  img {
    width: 64px;
    height: 64px;
  }
`;

export const WeatherDetail = styled.p<WeatherDetailProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.75rem 0;
  font-size: 1.1rem;
  line-height: 1.6;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`;

export const WeatherEmoji = styled.span`
  display: inline-block;
  font-size: 1.5rem;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
`;

export const ErrorText = styled.p`
  color: ${({ theme }) => theme.error};
  text-align: center;
  margin: 1rem 0;
  font-weight: 500;
`;

export const RefreshButton = styled(WeatherButton)`
  margin: 2rem auto;
  display: block;
  animation: ${pulse} 2s infinite;

  &:hover {
    animation: none;
  }
`;

export const TimeDetail = styled(WeatherDetail)`
  font-weight: 600;
  margin-bottom: 1rem;
`;