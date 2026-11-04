"use client";

import { withAccount, withAuth } from "@/app/providers/auth";
import { MapPage } from "@/pages-root/map/map.page";
import { Suspense } from "react";

const ProtectedMapPage = withAuth(withAccount(MapPage));

export default function MapRoute() {
  return (
    <Suspense fallback={null}>
      <ProtectedMapPage />
    </Suspense>
  );
}
