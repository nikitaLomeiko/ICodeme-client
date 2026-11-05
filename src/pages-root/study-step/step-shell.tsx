"use client";

import { ReactNode } from "react";
import { PageLoading } from "@/widgets/layout/ui/page-loading";
import { BackButton } from "@/shared/ui/back-button";

interface Props {
  children?: ReactNode;
  message?: string;
  loading?: boolean;
}

export function StepShell({ children, message, loading }: Props) {
  return (
    <div className="w-full px-4 pb-12 pt-3 sm:px-6">
      <div className="mb-5 flex items-center gap-3">
        <BackButton />
        <span className="text-sm text-[var(--ui-text-muted)]">Учебный шаг</span>
      </div>
      {loading ? <PageLoading /> : message ? <p role="status" className="rounded-2xl border border-[var(--ui-border)] bg-[var(--ui-background-secondary)] p-6 text-[var(--ui-text-muted)]">{message}</p> : children}
    </div>
  );
}
