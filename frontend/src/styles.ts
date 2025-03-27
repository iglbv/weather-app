import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { keyframes } from '@emotion/react';
import { WeatherData } from './types/weather';

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

declare module '@emotion/react' {
  export interface Theme extends ThemeColors { }
}

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const GlobalStyles = styled.div`
  body {
    margin: 0;
    padding-top: 64px;
    padding: 0;
    min-height: 100vh;
    font-family: 'Montserrat', sans-serif;
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    line-height: 1.6;
  }

  * {
    box-sizing: border-box;
  }

  h1, h2, h3, h4 {
    font-family: 'Inter', sans-serif;
    margin: 0 0 1rem 0;
  }
`;

export const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  padding-top: 6rem;
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

export const Toolbar = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  background: ${({ theme }) => theme.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

export const ToolbarTitle = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
`;

export const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding: 0.75rem 1.25rem;
  margin-left: 0.5rem;
  border-radius: 6px;
  transition: all 0.2s ease;
  font-size: 1rem;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-1px);
  }

  &.active {
    background: rgba(255, 255, 255, 0.25);
    font-weight: 600;
  }
`;

export const WeatherFormStyled = styled.form`
  display: flex;
  gap: 1rem;
  max-width: 600px;
  margin: 0 auto 2rem;
  animation: ${fadeIn} 0.3s ease;
`;

export const WeatherInput = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  border: 2px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.cardBg};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
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
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.secondary};
  }
`;

export const WeatherListStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const getTempGradient = (temp: number) => {
  if (temp < 0) return 'linear-gradient(135deg, #0061ff, #0040a8)';
  if (temp < 10) return 'linear-gradient(135deg, #00a86b, #007a4d)';
  if (temp < 20) return 'linear-gradient(135deg, #ff8c00, #cc7000)';
  return 'linear-gradient(135deg, #ff3d3d, #cc0000)';
};

export const WeatherItem = styled.div<{ weather: WeatherData }>`
  position: relative;
  background: ${({ weather }) => getTempGradient(weather.main.temp)};
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  color: white;
  min-height: 350px;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: white;
  }
`;

export const WeatherIcon = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;

  img {
    width: 64px;
    height: 64px;
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
  }
`;

export const WeatherDetail = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.75rem 0;
  font-size: 1.1rem;
`;

export const WeatherEmoji = styled.span`
  font-size: 1.5rem;
`;

export const ErrorText = styled.p`
  color: ${({ theme }) => theme.error};
  text-align: center;
  margin: 1rem 0;
  font-weight: 500;
  animation: ${fadeIn} 0.3s ease;
  min-height: 1.5rem;
`;

export const RefreshButton = styled(WeatherButton)`
  margin: 2rem auto;
  display: block;
`;

export const DeleteButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  color: white;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

export const HistoryContainer = styled.div`
  margin: 6rem auto 2rem; /* Отступ сверху 6rem */
  padding: 2rem;
  max-width: 800px;
  background: ${({ theme }) => theme.cardBg};
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  h2 {
    color: ${({ theme }) => theme.primary};
    margin-bottom: 1.5rem;
    font-size: 1.8rem;
    text-align: center;
  }

  @media (max-width: 768px) {
    margin: 5rem 1rem 1rem;
    padding: 1.5rem;
  }
`;