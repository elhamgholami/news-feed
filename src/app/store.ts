import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { API } from "../services/api";

export const store = configureStore({
  reducer: {
    [API.reducerPath]: API.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(API.middleware),
});


setupListeners(store.dispatch);
