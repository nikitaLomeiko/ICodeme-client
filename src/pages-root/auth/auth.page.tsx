"use client";

import { AuthForm } from "@/features/auth";
import { useRouter } from "next/navigation";

export const AuthPage = () => {
  const router = useRouter();

  return <AuthForm onSuccess={() => router.push("/auth/profile")} />;
};
