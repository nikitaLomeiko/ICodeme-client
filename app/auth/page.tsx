"use client";

import { AuthForm } from "@/features/auth";
import { AuthLayout } from "@/widgets/auth-layout";
export default function Auth() {
  return (
    <AuthLayout>
      <AuthForm onSuccess={() => null} />
    </AuthLayout>
  );
}
