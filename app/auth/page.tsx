"use client";

import { AuthForm } from "@/features/auth";
import { ProfileForm } from "@/features/profile-form";
import { AuthLayout } from "@/widgets/auth-layout";
export default function Auth() {
  return (
    <AuthLayout>
      {/* <AuthForm onSuccess={() => null} /> */}
      <ProfileForm />
    </AuthLayout>
  );
}
