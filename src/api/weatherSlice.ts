import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_KEY = process.env.API_KEY as string;

export interface Weather{
    weather:{
        main:string;
        description:string;
    }[];
    main:{
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
    };
    visibility:number;
    wind:{
        speed:number;
        gust:number;
    };
    rain:{
        "1h":number;
    };
    timezone:number;
}

type queryParams = {date:string;city:string;cnt:number;};

export const weatherApiSlice = createApi({
    reducerPath: 'weatherAPI',
    baseQuery: fetchBaseQuery({
      baseUrl: 'http://localhost:3001',
      prepareHeaders(headers) {
        headers.set('x-api-key', API_KEY);
  
        return headers;
      },
    }),
    endpoints(builder) {
      return {
        fetchForecast: builder.query<Weather[], queryParams>({
          query(args) {
            return `/forecast?cnt=${args.cnt}`;
          },
        }),
      };
    },
  });
  
  export const { useFetchForecastQuery } = weatherApiSlice;