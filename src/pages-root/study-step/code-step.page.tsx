"use client";

import { IDE } from "@/entities/ide";
import {
  StepShell,
  useStepRouteParams,
  useStudyStep,
} from "@/widgets/step-shell";

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
    <StepShell
      title={step.title}
      description={step.description}
      content={step.code}
    >
      <div className="flex w-full min-w-0 flex-col gap-5">
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
