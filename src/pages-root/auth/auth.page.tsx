"use client";

import { AuthForm } from "@/features/auth";
import { ThemeSelector } from "@/shared/ui/kit";
import { AuthLayout } from "@/widgets/auth-layout";
import { useRouter } from "next/navigation";

export const AuthPage = () => {
  const router = useRouter();

  return (
    <AuthLayout>
      <AuthForm onSuccess={() => router.push("/auth/profile")} />
    </AuthLayout>
  );
};
