import { RootState } from "@/app/providers/store";

export const selectUserId = (state: RootState) => state.auth.user.id;
export const selectUserName = (state: RootState) => state.auth.user.name;
export const selectUserEmail = (state: RootState) => state.auth.user.email;
