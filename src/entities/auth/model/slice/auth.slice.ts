import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { IAuthData, IAuthState, IToken } from "../types";

const initialState: IAuthState = {
  isAuthenticated: null,
  user: {
    id: "",
    email: "",
  },
  token: {
    accessToken: "",
    refreshToken: "",
  },
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthData: (state: IAuthState, action: PayloadAction<IAuthData>) => {
      state.user = {
        email: action.payload.email,
        id: action.payload.id,
      };

      state.isAuthenticated = true;
    },

    setUserId: (state: IAuthState, action: PayloadAction<string>) => {
      state.user.id = action.payload;
    },

    logout: (state: IAuthState) => {
      state.isAuthenticated = null;
      state.user = {
        id: "",
        email: "",
      };
      state.token = {
        refreshToken: "",
        accessToken: "",
      };

      localStorage.removeItem("auth_token");
    },

    loadAuthToken: (state: IAuthState) => {
      const token = localStorage.getItem("auth_token");
      if (token) {
        state.token = JSON.parse(token) as IToken;
        state.isAuthenticated = true;
      } else {
        state.isAuthenticated = false;
      }
    },

    saveAuthToken: (state: IAuthState, action: PayloadAction<IToken>) => {
      localStorage.setItem("auth_token", JSON.stringify(action.payload));

      state.token = action.payload;
      state.isAuthenticated = true;
    },
  },
});

export const { setAuthData, logout, loadAuthToken, saveAuthToken, setUserId } =
  AuthSlice.actions;

export const authSliceReducer = AuthSlice.reducer;
