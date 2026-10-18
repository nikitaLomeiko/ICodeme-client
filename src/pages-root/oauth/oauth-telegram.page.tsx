"use client";

import { useEffect, useRef } from "react";
import { useTelegramVerifiyMutation } from "@/entities/auth";
import { Loader } from "@/shared/ui/kit";

const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN || "http://127.0.0.1:5173/";

interface IProps {
  hash: string;
}

export const OAuthTelegramPage: React.FC<IProps> = ({ hash }) => {
  const [verify] = useTelegramVerifiyMutation();
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const params: Record<string, string> = {};

    hash.split("&").forEach(function (p) {
      const kv = p.split("=");
      params[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1] || "");
    });

    const authorize = async () => {
      try {
        const result = await verify(JSON.stringify(params)).unwrap();

        if (!result.success || !result.data) {
          window.location.href = `${DOMAIN}oauth/error`;
          return;
        }

        const { token, refreshToken, userId, email } = result.data;
        window.location.href = `${DOMAIN}oauth/success?token=${encodeURIComponent(token)}&refreshToken=${encodeURIComponent(refreshToken)}&userId=${encodeURIComponent(userId)}&email=${encodeURIComponent(email)}`;
      } catch {
        window.location.href = `${DOMAIN}oauth/error`;
      }
    };

    authorize();
  }, [hash, verify]);

  return (
    <div className="flex justify-center items-center h-screen">
      <Loader />
    </div>
  );
};
