import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IAuthData, IAuthState } from "./types/auth.types";

const initialState: IAuthState = {
  isAuthenticated: false,
  user: {
    id: "",
    name: "",
    email: "",
  },
  token: "",
  isLoading: false,
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthData: (state: IAuthState, action: PayloadAction<IAuthData>) => {
      state.user = {
        email: action.payload.email,
        id: action.payload.id,
        name: action.payload.name,
      };

      state.isAuthenticated = true;
    },

    logout: (state: IAuthState) => {
      state.isAuthenticated = false;
      state.user = {
        id: "",
        name: "",
        email: "",
      };
      state.token = "";
    },

    loadAuthToken: (state: IAuthState) => {
      const token = localStorage.getItem("auth_token");
      if (token) {
        state.token = token;
        state.isAuthenticated = true;
      }
    },

    saveAuthToken: (state: IAuthState, action: PayloadAction<string>) => {
      localStorage.setItem("auth_token", action.payload);

      state.token = action.payload;
      state.isAuthenticated = true;
    },

    setLoading: (state: IAuthState, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setAuthData, logout, loadAuthToken, saveAuthToken, setLoading } =
  AuthSlice.actions;

export const authSliceReducer = AuthSlice.reducer;
