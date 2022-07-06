import React, { useState } from 'react';
import { useAppSelector } from '../app/hooks';
import { useFetchForecastQuery } from '../api/weatherSlice';
import { WeatherBar,WeatherBarProps } from './WeatherBar';
import { Weather } from '../api/weatherSlice';
import { WeatherToday, WeatherTodayProps } from './WeatherToday';
import { city, date, weatherType,Days, Day } from '../types';
import { WeatherTable,WeatherTableProps,WeatherRow } from './WeatherTable';
import { faCloud,faSun, faSmog,faCloudShowersHeavy,IconDefinition} from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';

const getWeatherIcon = (type:weatherType):IconDefinition =>{
    switch (type){
        case 'clear':
            return faSun;
        case 'clouds':
            return faCloud;
        case 'haze':
            return faSmog;
        case 'rain':
            return faCloudShowersHeavy;
    }
}

const weatherBarInitData:WeatherBarProps = {
    weather:{
        dewPoint:0,
        humidity:0,
        pressure:0,
        rain:0,
        uvIndex:0,
        visibility:0,
        wind:0
    }
}
const weatherTodayInitData:WeatherTodayProps = {
    city:"",
    dateAndTime:"",
    description:"",
    feels:"",
    icon:faCloudShowersHeavy
}

const getWeatherBarData = (data:Weather):WeatherBarProps =>{
    const weatherBarProps:WeatherBarProps = {
        weather:{
            dewPoint: data.main.feels_like,
            humidity:data.main.humidity,
            pressure:data.main.pressure,
            rain:data.rain && data.rain.hasOwnProperty('1h') ? data.rain['1h']:0,
            uvIndex:0,
            visibility:data.visibility,
            wind:data.wind.speed
        }
    }
    return weatherBarProps;
}

const getWeatherForeCastInitData = ():WeatherTableProps => {
    const rows = Array(4).fill(0).map((_, i):WeatherRow => ({
            date:"Monday",
            high:"",
            low:"",
            wind:"",
            icon:faCloudShowersHeavy,
            key:uuidv4()
        })
    )
    return ({
        data:rows
    });
} 
const getWeatherTodayData = (city:city,date:date, data:Weather):WeatherTodayProps=>{
    const type = data.weather[0].main.toLowerCase() as weatherType;
    const icon = getWeatherIcon(type);
    const weatherTodayProps:WeatherTodayProps={
        city,
        dateAndTime: `${date} ${new Date(Date.now() - data.timezone).toLocaleTimeString()}`,
        description: data.weather[0].description,
        icon,
        feels: data.main.feels_like+""
    }
    return weatherTodayProps;
}

const getWeatherForeCast = (date:date,data:Weather []):WeatherTableProps => {
    const day = new Date(date).getDay();
    const weatherRows = data.map((item,index):WeatherRow=>{
        const date = Days[(day+index)%6];
        const type = item.weather[0].main.toLowerCase() as weatherType;
        const icon = getWeatherIcon(type);
        return ({
            date,
            high:item.main.temp_max+"",
            low:item.main.temp_min+"",
            wind:item.wind.speed+"",
            icon,
            key:uuidv4()
        });
    });
    return ({
        data:weatherRows
    });
}

export const WeatherDisplay: React.FC = () => {
    const { date, city } = useAppSelector(state => state.search);
    const { data = [], isFetching } = useFetchForecastQuery({ city, date, cnt: 16 });
    
    const mainWeatherBarData = !isFetching && data.length > 0 ? getWeatherBarData(data[0]) : weatherBarInitData;
    const mainWeatherTodayData = !isFetching && data.length > 0 ? getWeatherTodayData(city,date,data[0]) : weatherTodayInitData;
    const weatherForeCastData = !isFetching && data.length > 0 ? getWeatherForeCast(date,data) : getWeatherForeCastInitData();
    return (
        // <div>
        //     {mainWeatherBarData && <WeatherBar {...mainWeatherBarData}/> }
        //     {mainWeatherTodayData && <WeatherToday {...mainWeatherTodayData}/> }
        //     {weatherForeCastData && <WeatherTable {...weatherForeCastData}/>}
        // </div>
        <div>
            <WeatherBar {...mainWeatherBarData}/>
            <WeatherToday {...mainWeatherTodayData}/> 
            <WeatherTable {...weatherForeCastData}/>
        </div>
    );
};