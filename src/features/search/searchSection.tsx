import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { updateDate, updateCity, updateSelectedMetric } from './search-slice';
import { SearchBar } from '../../components/SearchBar';
import { date, city, metrics } from '../../types';

export const SearchSection: React.FC = () => {
    const search = useAppSelector(state => state.search);
    const dispatch = useAppDispatch();
    const handleChange = (name: string, value: date | city | metrics) => {
        if (typeof value === 'string') {
            switch (name) {
                case 'search_date':
                    dispatch(updateDate(value));
                    break;
                case 'search_city':
                    dispatch(updateCity(value));
                    break;
            }
        } else if (name === 'search_metric') {
            dispatch(updateSelectedMetric(value));
        }
    };
    return (
        <div className='search-section'>
            <span>Weather</span>
            <SearchBar {...search} handleChange={handleChange} />
        </div>
        
    );
}