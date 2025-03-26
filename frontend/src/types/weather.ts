export interface WeatherCondition {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface WeatherMain {
    temp: number;
    feels_like: number;
    humidity: number;
}

export interface WeatherWind {
    speed: number;
}

export interface WeatherData {
    weather: WeatherCondition[];
    main: WeatherMain;
    wind: WeatherWind;
    name: string;
    timezone: number;
}

export interface CityWeather {
    id: string;
    name: string;
    weather: WeatherData;
}