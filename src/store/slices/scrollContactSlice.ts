import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  path: "",
};

const scrollContactSlice = createSlice({
  name: "scrollContact",
  initialState,
  reducers: {
    setPath: (state, action) => {
      console.log("JJJJ", action.payload);
      return { ...state, ...action.payload };
    },
  },
});

export const { setPath } = scrollContactSlice.actions;
export default scrollContactSlice.reducer;
