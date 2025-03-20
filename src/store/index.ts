import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { flightApi } from "./services/flightApi";
import authReducer from "./slices/authSlice";
import searchFilterSlice from "./slices/searchFilterSlice";
import scrollContactSlice from "./slices/scrollContactSlice";
import loaderSlice from "./slices/loaderSlice";
import { blogListApi } from "./services/blogListApi";

export const store = configureStore({
  reducer: {
    [flightApi.reducerPath]: flightApi.reducer,
    [blogListApi.reducerPath]: blogListApi.reducer,
    auth: authReducer,
    scrollContact: scrollContactSlice,
    loader: loaderSlice,
    searchFilter: searchFilterSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(flightApi.middleware)
      .concat(blogListApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
