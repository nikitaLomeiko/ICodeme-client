"use client";

import { Document } from "@/entities/document";
import { StepShell } from "@/pages-root/study-step/step-shell";
import { useStudyStep } from "@/pages-root/study-step/use-study-step";
import { useStepRouteParams } from "@/pages-root/study-step/step-route";

export const DocumentationPage = () => {
  const { studyId, moduleIndex, levelIndex, stepIndex } = useStepRouteParams();
  const { isValid, isLoading, isError, study, step } = useStudyStep({
    studyId,
    moduleIndex,
    levelIndex,
    stepIndex,
  });
  const documentStep = step?.type === "document" ? step : undefined;
  const content = documentStep?.document;
  const documentId = `${studyId}:${Number(moduleIndex)}:${Number(levelIndex)}:${Number(stepIndex)}`;
  if (isLoading) return <StepShell loading />;

  return (
    <StepShell>
      {!isValid ? (
        <p className="p-6 text-[var(--ui-text-muted)]">
          Некорректная ссылка на шаг.
        </p>
      ) : isError || !study ? (
        <p className="p-6 text-[var(--ui-text-muted)]">
          Не удалось загрузить план обучения.
        </p>
      ) : !documentStep || !content ? (
        <p className="p-6 text-[var(--ui-text-muted)]">
          Документация для этого шага не найдена.
        </p>
      ) : (
        <Document
          key={documentId}
          documentId={documentId}
          title={documentStep.title}
          content={content}
        />
      )}
    </StepShell>
  );
};
