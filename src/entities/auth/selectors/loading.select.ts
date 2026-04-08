import { RootState } from "@/app/providers/store";

export const selectLoading = (state: RootState) => state.auth.isLoading;
