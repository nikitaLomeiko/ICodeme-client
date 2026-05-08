"use client";

import { Button } from "@/shared/ui/kit";
import { FiBriefcase, FiCode, FiTrash2 } from "react-icons/fi";
import { IStudy } from "../model/types";
import { FaRocket } from "react-icons/fa";

interface IProps {
  study: IStudy;
  onContinue: () => void;
  onDelete: () => void;
}

export const PlanItem: React.FC<IProps> = ({ study, onContinue, onDelete }) => {
  return (
    <div className="group relative overflow-hidden bg-gradient-to-r from-[var(--ui-background)] to-[var(--ui-background-secondary)] border border-[var(--ui-border)] rounded-xl transition-all duration-300 hover:shadow-lg">
      <button
        onClick={onDelete}
        className="absolute top-3 right-3 p-1.5 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors z-10"
        title="Удалить план"
      >
        <FiTrash2 size={16} />
      </button>

      <div className="p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row sm:items-start gap-3">
          <div className="p-2 bg-[var(--ui-primary)]/10 rounded-lg flex-shrink-0 self-start">
            <FiCode className="text-[var(--ui-primary)] text-lg" />
          </div>
          <div className="flex-1 min-w-0 pr-6">
            <div className="text-base font-bold text-[var(--ui-text)] mb-1">
              {study.study.programmingLanguage}
            </div>
            <div className="text-xs text-[var(--ui-text-secondary)]">
              Модуль: {study.study.moduleTitle || "Не начато"}
            </div>
            <div className="text-xs text-[var(--ui-text-secondary)]">
              Уровень: {study.study.levelTitle || "Не начато"}
            </div>
            <div className="mt-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-[var(--ui-primary)]/10 rounded-md text-xs font-medium text-[var(--ui-primary)]">
                <FiBriefcase size={12} />
                {study.level.positionName}
              </span>
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={onContinue}
              className="w-full"
            >
              <FaRocket size={14} /> Перейти
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
