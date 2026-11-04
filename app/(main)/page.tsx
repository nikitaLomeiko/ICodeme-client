"use client";

import { withAccount, withAuth } from "@/app/providers/auth";
import { HomePage } from "@/pages-root/home";
import { Suspense } from "react";

const ProtectedHomePage = withAuth(withAccount(HomePage));

export default function HomeRoute() {
  return (
    <Suspense fallback={null}>
      <ProtectedHomePage />
    </Suspense>
  );
}
