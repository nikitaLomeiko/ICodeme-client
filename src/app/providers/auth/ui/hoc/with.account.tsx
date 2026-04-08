"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/shared/lib/hooks";
import { selectUserName } from "@/entities/auth";
import { useNotification } from "@/shared/ui/kit";

export function withAccount<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  redirectTo = "/auth/profile",
) {
  return function AuthenticatedComponent(props: P) {
    const router = useRouter();
    const isName = useAppSelector(selectUserName) !== "";
    const notification = useNotification();
    const hasWarnedRef = useRef(false);

    useEffect(() => {
      if (!isName && !hasWarnedRef.current) {
        hasWarnedRef.current = true;
        router.replace(redirectTo);
        notification.warning(
          "It is necessary to fill in the users primary information",
        );
      }
    }, [isName, router]);

    if (!isName) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}
