"use client";

import { IDE } from "@/entities/ide";
import { useStudyStep } from "./use-study-step";
import { StepShell } from "./step-shell";
import { useStepRouteParams } from "./step-route";

export function CodeStepPage() {
  const params = useStepRouteParams();
  const { isValid, isLoading, isError, study, step } = useStudyStep(params);
  if (!isValid) return <StepShell message="Некорректная ссылка на шаг." />;
  if (isLoading) return <StepShell loading />;
  if (isError || !study)
    return <StepShell message="Не удалось загрузить план обучения." />;
  if (!step || (step.type !== "code" && step.type !== "exam") || !step.code) {
    return <StepShell message="Задание для этого шага не найдено." />;
  }

  const language = "python";
  return (
    <StepShell>
      <div className="flex w-full min-w-0 flex-col gap-5">
        <section className="rounded-2xl border border-[var(--ui-border)] bg-[var(--ui-background-secondary)] p-5 shadow-sm">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--ui-primary)]">
            Задание
          </span>
          <h1 className="mt-2 text-xl font-bold text-[var(--ui-text)]">
            {step.title}
          </h1>
          {step.description && (
            <p className="mt-3 whitespace-pre-wrap text-sm text-[var(--ui-text-muted)]">
              {step.description}
            </p>
          )}
          <div className="mt-5 border-t border-[var(--ui-border)] pt-5 whitespace-pre-wrap text-sm leading-7 text-[var(--ui-text)]">
            {step.code}
          </div>
        </section>
        <div className="w-full min-w-0 overflow-hidden rounded-xl border border-[var(--ui-border)]">
          <IDE
            key={`${params.studyId}:${params.moduleIndex}:${params.levelIndex}:${params.stepIndex}`}
            userId={study?.userId ?? ""}
            meta={{
              name: `study-${params.studyId}-${params.moduleIndex}-${params.levelIndex}-${params.stepIndex}`,
              title: step.title,
              subtitle: step.description,
              language,
            }}
            initialFiles={[
              {
                id: "main",
                name: "main.py",
                type: "file",
                content: "",
                children: [],
              },
            ]}
            className="h-[85vh] min-h-[650px]"
          />
        </div>
      </div>
    </StepShell>
  );
}
