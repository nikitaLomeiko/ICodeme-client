import { fetchBase, IResponse } from "@/shared/api";
import { createApi } from "@reduxjs/toolkit/query/react";
import { IStudy } from "../model";

export const studyApi = createApi({
  reducerPath: "studyApi",
  baseQuery: fetchBase,
  tagTypes: ["Study"],
  endpoints: (build) => ({
    getMyStudy: build.query<IResponse<IStudy[]>, null>({
      query: () => ({
        url: "study/me",
        method: "GET",
      }),
      providesTags: ["Study"],
    }),
    addNewLanguage: build.mutation<IResponse<IStudy>, string>({
      query: (language) => ({
        url: "study/me",
        method: "POST",
        body: { programmingLanguage: language },
      }),
      invalidatesTags: ["Study"],
    }),
    deleteStudy: build.mutation<IResponse<void>, string>({
      query: (id) => ({
        url: `study/me/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Study"],
    }),
  }),
});

export const {
  useGetMyStudyQuery,
  useLazyGetMyStudyQuery,
  useAddNewLanguageMutation,
  useDeleteStudyMutation,
} = studyApi;
