import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const flightApi = createApi({
  reducerPath: 'flightApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_FLIGHT_API_URL }),
  endpoints: (builder) => ({
    searchFlights: builder.query({
      query: (params) => ({
        url: 'search',
        method: 'GET',
        params,
      }),
    }),
  }),
});

export const { useSearchFlightsQuery } = flightApi;