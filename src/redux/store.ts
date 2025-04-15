import { configureStore } from '@reduxjs/toolkit';
import { nasaApi } from './apiSlice';

const store = configureStore({
  reducer: {
    [nasaApi.reducerPath]: nasaApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(nasaApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
