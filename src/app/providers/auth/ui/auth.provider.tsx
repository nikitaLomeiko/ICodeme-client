"use client";

import {
  IAuthData,
  loadAuthToken,
  setAuthData,
  setLoading,
} from "@/entities/auth";
import { useAppDispatch } from "@/shared/lib/hooks";
import { useEffect } from "react";
import { store } from "../../store/model/store";

interface IProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<IProps> = ({ children }) => {
  const dispatch = useAppDispatch();

  dispatch(setLoading(true));

  useEffect(() => {
    const fetch = async () => {
      dispatch(loadAuthToken());

      const token = store.getState().auth.token;

      if (token) {
        // make a request token
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const mockData: IAuthData = {
          id: "1",
          email: "mock@data.com",
          name: "asdf",
        };

        dispatch(setAuthData(mockData));
      }

      dispatch(setLoading(false));
    };

    fetch();
  }, [dispatch]);

  return children;
};
