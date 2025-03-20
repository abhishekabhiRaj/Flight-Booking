import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// http://16.171.241.23/flight/list/?page=1
export const flightApi = createApi({
  reducerPath: "flightApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://16.171.241.23/" }),
  endpoints: (builder) => ({
    searchFlights: builder.mutation({
      query: ({ body, page = 1 }) => ({
        url: `flight/list/?page=${page}`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useSearchFlightsMutation } = flightApi;

// import data from "../../data/data";

// export const flightApi = createApi({
//   reducerPath: "flightApi",
//   baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_BASE_URL }),
//   endpoints: (builder) => ({
//     searchFlights: builder.mutation({
//       queryFn: async (body) => {
//         console.log("Mock API Call: Waiting for 5 seconds...", body);
//         await new Promise((resolve) => setTimeout(resolve, 5000)); // Delay for 5 sec
//         console.log("Mock API Call: Returning Dummy Data");
//         return { data: data }; // Return dummy data after delay
//       },
//     }),
//   }),
// });

// export const { useSearchFlightsMutation } = flightApi;
