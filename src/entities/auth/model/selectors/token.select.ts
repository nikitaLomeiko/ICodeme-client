import { RootState } from "@/app/providers/store";

export const selectToken = (state: RootState) => state.auth.token;
