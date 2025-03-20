import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false,
};

const loaderSlice = createSlice({
  name: "loaderSlice",
  initialState,
  reducers: {
    setShowLoader: (state, action) => {
      initialState.show = action.payload;
    },
  },
});

export const { setShowLoader } = loaderSlice.actions;
export default loaderSlice.reducer;
