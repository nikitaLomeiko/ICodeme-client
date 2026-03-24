"use client";

import { AuthForm } from "@/features/auth";
import { LayoutApp } from "@/widgets/app-layout";
export default function Auth() {
  return (
    <LayoutApp
      panelWidth="xl:w-[500px] md:w-[400px] sm:w-[300px] w-full"
      position="right"
      className="bg-white/95"
    >
      <AuthForm onSuccess={() => null} />
    </LayoutApp>
  );
}
