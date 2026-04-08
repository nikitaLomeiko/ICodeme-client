"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/shared/lib/hooks";
import { selectIsAuthenticated, selectLoading } from "@/entities/auth";

export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  redirectTo = "/auth",
) {
  return function AuthenticatedComponent(props: P) {
    const router = useRouter();
    const isAuth = useAppSelector(selectIsAuthenticated);
    const isLoading = useAppSelector(selectLoading);

    useEffect(() => {
      if (!isLoading && !isAuth) {
        router.replace(redirectTo);
      }
    }, [isAuth, isLoading, router]);

    if (isLoading) {
      return null;
    }

    if (!isAuth) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}
