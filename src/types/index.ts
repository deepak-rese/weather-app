import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";

export const standard = {
    name:'K,kph',
    value:'standard'
} as const;

export const metric =
{
    name:'°C,kph',
    value:'metric'
} as const;

export const imperial = {
    name:'F,kph',
    value:'imperial'
} as const;

export type metrics = typeof standard | typeof metric | typeof imperial;

export interface weatherBar{
rain:number;
wind:number;
humidity:number;
pressure:number;
dewPoint:number;
uvIndex:number;
visibility:number;
}

export type date = string;
export type city = string;

export interface search{
    date: date;
    city: city;
    metrics: [typeof standard, typeof metric, typeof imperial];
    selectedMetric:metrics;
}

export type weatherType = 'clouds' | 'rain' | 'clear' | 'haze';

export const Days = ['Sunday', 'Monday' , 'Tuesday' , 'Wednesday' , 'Thursday' , 'Friday' , 'Saturday'] as const;

export type Day = typeof Days[number];