import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  trip_type: "ROUND",
  departure_airport: "",
  departure_airport_name: "",
  arrival_airport: "",
  arrival_airport_name: "",
  departure_date: "2025-02-19T18:30:00.000Z",
  return_date: "2025-02-25T18:30:00.000Z",
  num_passengers: 1,
  num_adult: 0,
  num_child: 0,
  num_senior: 0,
  num_infant: 0,
  travel_class: "economy",
  currency: "USD",
};

const searchFilterSlice = createSlice({
  name: "searchFilter",
  initialState,
  reducers: {
    setSearchFilter: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetSearchFilter: () => initialState,
  },
});

export const { setSearchFilter, resetSearchFilter } = searchFilterSlice.actions;
export default searchFilterSlice.reducer;
