"use client";

import { useGetMyStudyByIdQuery } from "@/entities/study";
import { Document } from "@/entities/document";
import { Button } from "@/shared/ui/kit";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

interface IProps {
  studyId?: string;
  moduleIndex?: string;
  levelIndex?: string;
  stepIndex?: string;
}

export const DocumentationPage = ({
  studyId,
  moduleIndex,
  levelIndex,
  stepIndex,
}: IProps) => {
  const router = useRouter();

  const modulePosition = Number(moduleIndex);
  const levelPosition = Number(levelIndex);
  const stepPosition = Number(stepIndex);
  const hasValidPosition =
    Boolean(studyId) &&
    [moduleIndex, levelIndex, stepIndex].every(
      (index) => index !== undefined && index !== "",
    ) &&
    [modulePosition, levelPosition, stepPosition].every(
      (index) => Number.isInteger(index) && index >= 0,
    );

  const { data, isLoading, isError } = useGetMyStudyByIdQuery(studyId ?? "", {
    skip: !hasValidPosition,
  });

  const step =
    data?.data?.studyPlanJSON[modulePosition]?.levels[levelPosition]?.steps[
      stepPosition
    ];
  const documentStep = step?.type === "document" ? step : undefined;
  const content = documentStep?.document;
  const documentId = `${studyId}:${modulePosition}:${levelPosition}:${stepPosition}`;

  return (
    <div>
      <Button
        className="fixed top-4 left-5"
        icon={FaArrowLeft}
        iconPosition="left"
        onClick={() => router.back()}
        variant="ghost"
      />
      {!hasValidPosition ? (
        <p className="p-6 text-[var(--ui-text-muted)]">
          Некорректная ссылка на шаг.
        </p>
      ) : isLoading ? (
        <p className="p-6 text-[var(--ui-text-muted)]">
          Загрузка документации...
        </p>
      ) : isError || !data?.success ? (
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
          className="px-20"
          documentId={documentId}
          title={documentStep.title}
          content={content}
        />
      )}
    </div>
  );
};
