import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {weatherType} from '../types';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface WeatherTodayProps {
city:string;
dateAndTime:string;
description:string;
feels:string;
icon:IconDefinition;
};

export const WeatherToday: React.FC<WeatherTodayProps> = ({city,dateAndTime,description,feels,icon}) => {
        return (
            <div className='weather-today'>
                <h1 className='city-name'>{city}</h1>
                <div className='weather-info-section'>
                    <FontAwesomeIcon icon = {icon} size={'5x'} className='weather-img'/>
                    <div className='weather-info'>
                        <p>{dateAndTime}</p>
                        <p>{description}</p>
                        <p>{feels}</p>
                    </div>
                </div>
            </div>
        );
};