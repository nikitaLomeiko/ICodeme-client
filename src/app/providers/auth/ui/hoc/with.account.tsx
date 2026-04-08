"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/shared/lib/hooks";
import { selectUserName } from "@/entities/auth";

export function withAccount<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  redirectTo = "/auth/profile",
) {
  return function AuthenticatedComponent(props: P) {
    const router = useRouter();
    const isName = useAppSelector(selectUserName) !== "";

    useEffect(() => {
      console.log(isName);
      if (!isName) {
        router.replace(redirectTo);
      }
    }, [isName, router]);

    if (!isName) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}
