import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDroplet, faWind } from '@fortawesome/free-solid-svg-icons';
import { weatherBar } from '../types';
export interface WeatherBarProps {
    weather: weatherBar
};

const weatherIcons = {
    wind: faWind,
    humidity: faDroplet,
};

const weatherNames = {
    rain: "Rain",
    wind: "Wind",
    humidity: "Humidity",
    pressure: "Pressure",
    dewPoint: "Dew Point",
    uvIndex: "UV Index",
    visibility: "Visibility"
};

export const WeatherBar: React.FC<WeatherBarProps> = ({ weather }) => {
    return (
        <div className='weather-bar'>
            <ul >
                {Object.entries(weather).map(([key, value]) => (
                    <li key={key}>
                        <p>{weatherNames.hasOwnProperty(key) && weatherNames[key as keyof typeof weatherNames]}</p>
                        <p>{value}</p>
                        {weatherIcons.hasOwnProperty(key) && <FontAwesomeIcon icon={weatherIcons[key as keyof typeof weatherIcons]} />}
                    </li>
                ))}
            </ul>
        </div>
    );
};