import { configureStore } from '@reduxjs/toolkit';
import { weatherApiSlice } from '../api/weatherSlice';
import searchReducer from '../features/search/search-slice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    [weatherApiSlice.reducerPath]: weatherApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(weatherApiSlice.middleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;