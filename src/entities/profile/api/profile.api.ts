import { fetchBase, IResponse } from "@/shared/api";
import { createApi } from "@reduxjs/toolkit/query/react";
import { IProfile } from "../model";

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
  }),
});

export const { useGetProfileQuery, useLazyGetProfileQuery } = profileApi;
