"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  saveAuthToken,
  setAuthData,
  useValidateTokensMutation,
} from "@/entities/auth";
import { useAppDispatch } from "@/shared/lib/hooks";
import { useLazyGetProfileQuery } from "@/entities/profile";

export const OAuthSuccessPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [validate] = useValidateTokensMutation();
  const [getProfile] = useLazyGetProfileQuery();

  useEffect(() => {
    const processOAuth = async () => {
      const token = searchParams.get("token") || "";
      const refreshToken = searchParams.get("refreshToken") || "";
      const userId = searchParams.get("userId") || "";
      const email = searchParams.get("email") || "";

      const result = await validate({ accessToken: token, refreshToken });
      if (!result.data?.success) {
        router.push("/oauth/error");
        return;
      }

      dispatch(setAuthData({ email, id: userId }));
      dispatch(saveAuthToken({ accessToken: token, refreshToken }));

      const profile = await getProfile(null);

      if (!profile.data?.success) router.push("/auth/profile");
      else router.push("/");
    };

    processOAuth();
  }, []);

  return null;
};
