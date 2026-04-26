import { configureStore } from "@reduxjs/toolkit";
import { authSliceReducer } from "@/entities/auth";
import { authApi } from "@/entities/auth";
import { profileApi } from "@/entities/profile";

export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    [authApi.reducerPath]: authApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
  },

  devTools: process.env.NODE_ENV !== "production",

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([authApi.middleware, profileApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
