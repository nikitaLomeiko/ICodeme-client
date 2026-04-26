"use client";

import { useEffect } from "react";
import { useTelegramVerifiyMutation } from "@/entities/auth";
import { isApiError } from "@/shared/api";
import { Loader } from "@/shared/ui/kit";

const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN || "http://127.0.0.1:5173/";

interface IProps {
  hash: string;
}

export const OAuthTelegramPage: React.FC<IProps> = ({ hash }) => {
  const [verify] = useTelegramVerifiyMutation();

  useEffect(() => {
    const params: Record<string, string> = {};

    hash.split("&").forEach(function (p) {
      const kv = p.split("=");
      params[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1] || "");
    });

    const fetch = async () => {
      const result = await verify(JSON.stringify(params));

      if (result.error && isApiError(result.error)) {
        window.location.href = `${DOMAIN}oauth/error`;
      }

      window.location.href = `${DOMAIN}oauth/success?token=${result.data?.data?.token}&refreshToken=${result.data?.data?.refreshToken}&userId=${result.data?.data?.userId}&email=${result.data?.data?.email}`;
    };

    fetch();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <Loader />
    </div>
  );
};
