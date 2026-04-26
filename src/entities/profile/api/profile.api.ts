import { fetchBase, IResponse } from "@/shared/api";
import { createApi } from "@reduxjs/toolkit/query/react";
import { IProfile } from "../model";
import { ICreateProfileParams } from "./types";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBase,
  endpoints: (build) => ({
    getProfile: build.query<IResponse<IProfile>, null>({
      query: () => ({
        url: "profiles/me",
        method: "GET",
      }),
    }),
    createProfile: build.mutation<IResponse<IProfile>, ICreateProfileParams>({
      query: ({ about, avatar, languageProgram, name }) => ({
        url: "profiles/me",
        method: "POST",
        body: {
          profile: { about, avatar, name },
          programmingLanguage: languageProgram,
        },
      }),
    }),
  }),
});

export const {
  useGetProfileQuery,
  useLazyGetProfileQuery,
  useCreateProfileMutation,
} = profileApi;
