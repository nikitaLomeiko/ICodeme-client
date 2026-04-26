import { RootState } from "@/app/providers/store";

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
