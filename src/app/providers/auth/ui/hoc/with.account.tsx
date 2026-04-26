"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Loader, useNotification } from "@/shared/ui/kit";
import { useGetProfileQuery } from "@/entities/profile";

export function withAccount<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  redirectTo = "/auth/profile",
) {
  return function AuthenticatedComponent(props: P) {
    const router = useRouter();
    const notification = useNotification();
    const hasWarnedRef = useRef(false);
    const { isError, isLoading } = useGetProfileQuery(null);

    useEffect(() => {
      if (isError && !hasWarnedRef.current) {
        hasWarnedRef.current = true;
        router.replace(redirectTo);
        notification.warning(
          "It is necessary to fill in the users primary information",
        );
      }
    }, [router, isError]);

    if (!isLoading && !isError) return <WrappedComponent {...props} />;

    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader size="lg" />
      </div>
    );
  };
}
