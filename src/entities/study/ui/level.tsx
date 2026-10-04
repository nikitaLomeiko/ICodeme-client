import React from "react";
import { ILevel } from "../model";
import { FaPuzzlePiece, FaLock, FaCheck } from "react-icons/fa";

interface IProps extends ILevel {
  index: number;
  children: React.ReactNode;
  maxY: number;
  maxX: number;
}

export const Level: React.FC<IProps> = (props) => {
  const {
    description,
    title,
    id,
    index,
    children,
    maxX,
    maxY,
    isCompleted,
    isCurrent,
    steps,
  } = props;

  const isLocked = !isCompleted && !isCurrent;

  return (
    <div key={id} className="relative mb-20 last:mb-0">
      <div
        className={`
          relative mb-10 rounded-2xl
          transition-all duration-300
          ${
            isCurrent
              ? "bg-[color-mix(in_srgb,var(--ui-primary)_4%,transparent)]"
              : isCompleted
                ? "bg-[color-mix(in_srgb,var(--ui-primary)_4%,transparent)]"
                : ""
          }
          ${isLocked ? "opacity-70 grayscale-[35%]" : ""}
        `}
      >
        <div className="relative flex items-center gap-4 px-6 py-4 rounded-2xl">
          <div className="relative shrink-0">
            {isCurrent && (
              <>
                <span
                  aria-hidden
                  className="
                    absolute inset-0 rounded-xl
                    bg-[linear-gradient(135deg,var(--ui-primary),var(--ui-secondary))]
                    opacity-60 animate-ping
                  "
                />
                <span
                  aria-hidden
                  className="
                    absolute -inset-1 rounded-xl
                    bg-[linear-gradient(135deg,var(--ui-primary),var(--ui-secondary))]
                    opacity-30 blur-[8px]
                  "
                />
              </>
            )}

            <span
              className={`
                relative w-11 h-11 rounded-xl flex items-center justify-center
                text-white font-bold text-lg shadow-lg overflow-hidden
                bg-[linear-gradient(135deg,var(--ui-primary),var(--ui-secondary))]
                shadow-[var(--ui-brand-shadow)]
                ${isCurrent ? "ring-2 ring-white/40" : ""}
              `}
            >
              {isCompleted ? (
                <FaCheck className="text-base" />
              ) : isLocked ? (
                <FaLock className="text-base" />
              ) : (
                index
              )}
            </span>
          </div>

          <div className="min-w-0">
            <h3
              className={`
                text-xl font-bold leading-tight
                transition-colors duration-300
                ${
                  isCurrent
                    ? "text-[var(--ui-primary)]"
                    : "text-[var(--ui-text)]"
                }
              `}
            >
              {title}
            </h3>
            <p
              className="
                text-sm mt-0.5
                text-[var(--ui-text-muted)]
              "
            >
              {description}
            </p>
          </div>

          <div className="flex-1" />

          <div className="flex items-center gap-2">
            {isCurrent && (
              <span
                className="
                  text-[10px] font-bold uppercase tracking-wider
                  px-2.5 py-1 rounded-full text-white
                  bg-[linear-gradient(135deg,var(--ui-primary),var(--ui-secondary))]
                  shadow-[0_4px_12px_-2px_rgba(0,0,0,0.25)]
                "
              >
                Сейчас
              </span>
            )}
            {isLocked && (
              <span
                className="
                  text-[10px] font-bold uppercase tracking-wider
                  px-2.5 py-1 rounded-full
                  text-[var(--ui-text-muted)]
                  bg-[color-mix(in_srgb,var(--ui-background-tertiary)_60%,transparent)]
                  border border-[var(--ui-border)]
                "
              >
                Закрыто
              </span>
            )}

            {/* Счётчик шагов */}
            <span
              className={`
                text-xs px-3 py-1.5 rounded-full border font-medium
                flex items-center gap-1.5
                transition-colors duration-300
                ${
                  isCurrent
                    ? "text-[var(--ui-primary)] border-[color-mix(in_srgb,var(--ui-primary)_40%,transparent)]"
                    : "text-[var(--ui-text-muted)] border-[var(--ui-border)]"
                }
                bg-[color-mix(in_srgb,var(--ui-background-secondary)_70%,transparent)]
              `}
            >
              {isLocked ? (
                <FaLock className="text-[10px]" />
              ) : (
                <FaPuzzlePiece className="text-[10px]" />
              )}
              {steps.length} шагов
            </span>
          </div>
        </div>

        {/* Разделитель под хедером */}
        <div
          className={`
            absolute left-0 right-6 bottom-0 h-px transition-opacity duration-300
            ${
              isCurrent
                ? "opacity-80"
                : isCompleted
                  ? "opacity-60"
                  : "opacity-25"
            }
            bg-[linear-gradient(90deg,var(--ui-primary),var(--ui-border),transparent)]
          `}
        />
      </div>

      {/* Контент уровня */}
      <div
        className={`
          relative rounded-[2rem] w-full
          transition-all duration-500
          ${isLocked ? "opacity-45 grayscale-[60%] pointer-events-none" : ""}
        `}
        style={{ minHeight: maxY, minWidth: maxX }}
      >
        {children}

        {/* Оверлей для закрытого уровня */}
        {isLocked && (
          <div
            aria-hidden
            className="
              absolute inset-0 rounded-[2rem]
              bg-[linear-gradient(180deg,transparent,color-mix(in_srgb,var(--ui-background)_70%,transparent))]
              backdrop-blur-[2px]
            "
          />
        )}
      </div>
    </div>
  );
};
