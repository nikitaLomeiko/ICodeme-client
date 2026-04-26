"use client";

import { useEffect } from "react";
import {
  loadAuthToken,
  logout,
  selectToken,
  setAuthData,
  useLazyVerifyTokenQuery,
} from "@/entities/auth";
import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks";
import { isApiError } from "@/shared/api";

interface IProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<IProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const [verify] = useLazyVerifyTokenQuery();
  const token = useAppSelector(selectToken);

  useEffect(() => {
    dispatch(loadAuthToken());
  }, [dispatch]);

  useEffect(() => {
    if (token.accessToken !== "") {
      fetch();
      return;
    }

    async function fetch() {
      const result = await verify(null);

      if (result.error && isApiError(result.error)) dispatch(logout());

      if (result.data?.success && result.data.data)
        dispatch(
          setAuthData({
            email: result.data.data.email,
            id: result.data.data.userId,
          }),
        );
    }
  }, [token.accessToken]);

  return children;
};
