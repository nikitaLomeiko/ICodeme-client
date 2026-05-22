import {
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { ApiError, IBodyError } from "./types/error.types";
import { BASE_URL } from "./consts";
import { RootState } from "@/app/providers/redux-store";
import { refreshTokens } from "./request/refresh.request";

export const fetchBase: BaseQueryFn<
  string | FetchArgs,
  unknown,
  ApiError,
  {}
> = async (args, api, extraOptions) => {
  const getState = api.getState as () => RootState;
  const token = getState().auth.token;

  const makeRequest = async (token?: string) => {
    const baseQuery = fetchBaseQuery({
      baseUrl: BASE_URL,
      prepareHeaders: (headers) => {
        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
      },
    });

    const fetchArgs = typeof args === "string" ? { url: args } : args;

    return await baseQuery(fetchArgs, api, extraOptions);
  };

  let result = await makeRequest(token.accessToken);

  if (
    result.error &&
    (result.error as FetchBaseQueryError).status === 401 &&
    token.refreshToken
  ) {
    try {
      const refreshResult = await refreshTokens(token.refreshToken);

      if (refreshResult.data.accessToken) {
        api.dispatch({
          type: "auth/saveAuthToken",
          payload: {
            accessToken: refreshResult.data.accessToken,
            refreshToken: refreshResult.data.refreshToken || token.refreshToken,
          },
        });

        result = await makeRequest(refreshResult.data.accessToken);
      } else {
        api.dispatch({ type: "auth/logout" });

        if (typeof window !== "undefined") {
          window.location.href = "/auth";
        }
      }
    } catch (refreshError) {
      api.dispatch({ type: "auth/logout" });
      if (typeof window !== "undefined") {
        window.location.href = "/auth";
      }

      return {
        error: {
          status: 401,
          data: {
            message: "Session expired. Please login again.",
            error: "SESSION_EXPIRED",
          },
        } as ApiError,
      };
    }
  }

  if (result.error) {
    const error = result.error as FetchBaseQueryError;
    return {
      error: {
        status: error.status || 500,
        data: (error.data as IBodyError) || {
          message: "Unknown error",
          error: "UNKNOWN_ERROR",
        },
      } as ApiError,
    };
  }

  return result;
};
