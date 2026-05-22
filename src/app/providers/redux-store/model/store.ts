import { configureStore } from "@reduxjs/toolkit";
import { authSliceReducer } from "@/entities/auth";
import { authApi } from "@/entities/auth";
import { profileApi } from "@/entities/profile";
import { studyApi } from "@/entities/study";
import { documentApi } from "@/entities/document";

export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    [authApi.reducerPath]: authApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [studyApi.reducerPath]: studyApi.reducer,
    [documentApi.reducerPath]: documentApi.reducer,
  },

  devTools: process.env.NODE_ENV !== "production",

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      profileApi.middleware,
      studyApi.middleware,
      documentApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
