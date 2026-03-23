"use client";

import { AuthForm } from "@/features/auth";
import { LayoutApp } from "@/widgets/app-layout";

export default function Auth() {
  const handleSuccess = () => {
    console.log("Авторизация успешна");
  };

  return (
    <LayoutApp position="center">
      хуй
      {/* <AuthForm onSuccess={handleSuccess} /> */}
    </LayoutApp>
  );
}
