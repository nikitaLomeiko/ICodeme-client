import { RootState } from "@/app/providers/redux-store";

export const selectToken = (state: RootState) => state.auth.token;
