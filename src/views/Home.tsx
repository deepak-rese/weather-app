import React from 'react';
import { SearchSection } from '../features/search/searchSection';
import { WeatherDisplay } from '../components/WeatherDisplay';
import HomeErrorBoundary from '../error/HomeErrorBoundary';

export const Home: React.FC = () => {
        return (
            <HomeErrorBoundary>
            <SearchSection/>
            <WeatherDisplay/>
            </HomeErrorBoundary>
        );
};