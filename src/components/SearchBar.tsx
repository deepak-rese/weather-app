import React, { useState, useRef } from 'react';
import * as Types from '../types';

interface SearchBarProps extends Types.search {
    handleChange: (name: string, value: Types.date | Types.city | Types.metrics) => void;
};

export const SearchBar: React.FC<SearchBarProps> = ({ date, city, metrics, handleChange }) => {
    const [searchCity, setSearchCity] = useState(city);
    const searchCityRef = useRef<HTMLInputElement | null>(null);
    const handleKeyDown = (e:React.KeyboardEvent<HTMLInputElement>) =>{
        if(e.code.toLowerCase() === 'enter'){
            if(searchCityRef.current){
                searchCityRef.current.blur();
            };
            handleChange('search_city', searchCity);
        }
    }
    return (
        <div className='searchBar'>
            <div>
                <input type="date" name="search_date" onChange={(e) => handleChange(e.target.name, e.target.value)} value={date} />
            </div>
            <div>
                <input ref={searchCityRef} type="text" name="search_city"
                onChange={(e)=>setSearchCity(e.target.value)}
                onBlur={(e) => handleChange(e.target.name, e.target.value)} 
                onKeyUp={e=>handleKeyDown(e)}
                value={searchCity} />
            </div>
            <div>
                <select name="search_metric" onChange={(e) => {
                    const metric = metrics.find(m => m.value === e.target.value) || '';
                    handleChange(e.target.name, metric);
                }}>
                    {metrics.map(metric => <option key={metric.value} value={metric.value}>{metric.name}</option>)}
                </select>
            </div>
        </div>
    );
};