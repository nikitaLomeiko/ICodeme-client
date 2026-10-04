import { FaLock } from "react-icons/fa";
import { IStep } from "../model";
import {
  getCardStyle,
  getStepIcon,
  getStepLabel,
  getStepPalette,
} from "./style/step.style";

interface IProps extends IStep {
  stepNumber: number;
}

export const Step: React.FC<IProps> = (props) => {
  const {
    description,
    title,
    id,
    position,
    type,
    stepNumber,
    isCompleted,
    isCurrent,
  } = props;

  const pos = position;
  const Icon = getStepIcon(type);
  const label = getStepLabel(type);
  const palette = getStepPalette(type);
  const isLocked = !isCompleted && !isCurrent;

  const containerStyle: React.CSSProperties = {
    left: `${pos.x}%`,
    top: pos.y,
    zIndex: isCurrent ? 4 : 2,
  };

  const cardStyle = getCardStyle(isCompleted, isCurrent, palette);

  const glowColor = isCompleted ? "rgba(16,185,129,0.75)" : palette.dot;
  const glowSoft = isCompleted ? "rgba(16,185,129,0.35)" : palette.bg;

  return (
    <div
      key={id}
      className={`
        absolute group w-[150px] h-[150px] transition-transform duration-300
        ${
          isLocked
            ? "pointer-events-none cursor-default opacity-55 grayscale"
            : "cursor-pointer"
        }
      `}
      style={containerStyle}
    >
      {isCurrent && (
        <>
          <span
            aria-hidden
            className="
              pointer-events-none absolute inset-0 rounded-[1.6rem]
              animate-ping
            "
            style={{
              background: `radial-gradient(circle, ${glowSoft} 40%, transparent 70%)`,
            }}
          />
          <span
            aria-hidden
            className="
              pointer-events-none absolute -inset-1 rounded-[1.8rem]
              blur-[10px] opacity-70
            "
            style={{
              background: `radial-gradient(circle, ${glowColor} 30%, transparent 75%)`,
            }}
          />
        </>
      )}

      <div
        className={`
          relative w-full h-full rounded-[1.6rem] border
          flex flex-col items-center justify-center gap-1.5
          transition-all duration-300 ease-out will-change-transform
          ${
            isLocked
              ? ""
              : "group-hover:-translate-y-3 group-hover:scale-110 group-hover:rotate-3"
          }
        `}
        style={cardStyle}
      >
        {!isLocked && (
          <div
            aria-hidden
            className="
              pointer-events-none absolute inset-0 rounded-[1.6rem]
              opacity-0 blur-[6px]
              transition-opacity duration-300 ease-out
              group-hover:opacity-100
            "
            style={{
              boxShadow: `0 0 24px 6px ${glowSoft}, 0 0 48px 12px ${glowColor}`,
            }}
          />
        )}

        {!isCompleted && (
          <>
            {isLocked ? (
              <div
                className="
                  w-16 h-16 rounded-2xl flex items-center justify-center
                  bg-[color-mix(in_srgb,var(--ui-background-tertiary)_60%,transparent)]
                "
              >
                <FaLock className="text-2xl text-[var(--ui-text-muted)]" />
              </div>
            ) : (
              <div
                className="
                  w-16 h-16 rounded-2xl flex items-center justify-center
                  transition-all duration-300
                  group-hover:scale-110 group-hover:rotate-6
                "
                style={{ background: palette.bg }}
              >
                <Icon
                  className="text-2xl transition-transform duration-300"
                  style={{ color: palette.dot }}
                />
              </div>
            )}

            <span
              className="
                mt-2 text-[12px] font-bold uppercase tracking-wider
                px-2 py-0.5 rounded-full
              "
              style={{
                color: isLocked ? "var(--ui-text-muted)" : palette.dot,
                background: isLocked
                  ? "color-mix(in srgb, var(--ui-background-tertiary) 40%, transparent)"
                  : palette.chip,
              }}
            >
              {isLocked ? "Закрыто" : label}
            </span>
          </>
        )}

        {isCompleted && (
          <div className="flex flex-col items-center gap-1">
            <span
              className="
                w-16 h-16 rounded-full flex items-center justify-center
                text-white text-2xl
                bg-white/20
                shadow-[inset_0_2px_8px_rgba(255,255,255,0.25)]
                backdrop-blur-[4px]
              "
            >
              ✓
            </span>
            <span className="mt-2 text-[12px] font-bold uppercase tracking-wider text-white/90">
              Пройдено
            </span>
          </div>
        )}

        <span
          className="
            absolute -top-2 -right-2 w-7 h-7 rounded-full
            flex items-center justify-center
            text-xs font-bold text-white border-2 shadow-md
          "
          style={{
            background: isCompleted ? "#047857" : palette.dot,
            borderColor: "var(--ui-background)",
          }}
        >
          {stepNumber}
        </span>
      </div>

      <div
        className="
          absolute left-full top-1/2 ml-4 w-[200px] pointer-events-none
          -translate-y-1/2 translate-x-[-6px] opacity-0
          transition-all duration-300 ease-out
          group-hover:translate-x-0 group-hover:opacity-100
          group-focus-within:translate-x-0 group-focus-within:opacity-100
        "
      >
        <div className="text-left py-1 text-[var(--ui-text)]">
          <div className="text-[12px] font-bold leading-tight line-clamp-1">
            {title}
          </div>
          <div className="text-[10px] leading-tight mt-0.5 text-[var(--ui-text-muted)]">
            {description}
          </div>
        </div>
      </div>
    </div>
  );
};
