import { configureStore } from '@reduxjs/toolkit';
import headlinesReducer from "../app/TopHeadlines/headLine";

const store = configureStore({
  reducer: {
    headlines: headlinesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
