import {
  FaBook,
  FaCode,
  FaGraduationCap,
  FaLock,
  FaQuestion,
} from "react-icons/fa";
import { IStep, StepType } from "../model";
import { IconType } from "react-icons";

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

  const getStepIcon = () => {
    const icons: Record<StepType, IconType> = {
      document: FaBook,
      code: FaCode,
      quiz: FaQuestion,
      exam: FaGraduationCap,
    };
    return icons[type];
  };

  const getStepPalette = () => {
    const palettes: Record<
      StepType,
      { color: string; bg: string; ring: string; dot: string; chip: string }
    > = {
      document: {
        color: "#38bdf8",
        bg: "rgba(56,189,248,0.14)",
        ring: "rgba(56,189,248,0.45)",
        dot: "#0ea5e9",
        chip: "rgba(56,189,248,0.18)",
      },
      code: {
        color: "#34d399",
        bg: "rgba(52,211,153,0.14)",
        ring: "rgba(52,211,153,0.45)",
        dot: "#10b981",
        chip: "rgba(52,211,153,0.18)",
      },
      quiz: {
        color: "#fbbf24",
        bg: "rgba(251,191,36,0.14)",
        ring: "rgba(251,191,36,0.45)",
        dot: "#f59e0b",
        chip: "rgba(251,191,36,0.18)",
      },
      exam: {
        color: "#c084fc",
        bg: "rgba(192,132,252,0.14)",
        ring: "rgba(192,132,252,0.45)",
        dot: "#a855f7",
        chip: "rgba(192,132,252,0.18)",
      },
    };
    return palettes[type];
  };

  const getStepLabel = () => {
    const labels: Record<StepType, string> = {
      document: "Документ",
      code: "Код",
      quiz: "Тест",
      exam: "Экзамен",
    };
    return labels[type];
  };

  const pos = position;
  const Icon = getStepIcon();
  const label = getStepLabel();
  const palette = getStepPalette();
  const isLocked = !isCompleted && !isCurrent;

  return (
    <div
      key={id}
      className={`absolute group transition-all duration-300 ${isLocked ? "pointer-events-none cursor-default opacity-55 grayscale" : "cursor-pointer"} ${isLocked || isCompleted ? "" : "hover:-translate-y-2"}`}
      style={{
        left: pos.x,
        top: pos.y,
        zIndex: isCurrent ? 4 : 2,
        width: "120px",
        height: "120px",
      }}
    >
      <div
        className="relative w-full h-full rounded-[1.6rem] border flex flex-col items-center justify-center gap-1.5 transition-all duration-300"
        style={
          isCompleted
            ? {
                background: "linear-gradient(135deg, #059669, #10b981)",
                borderColor: "rgba(52,211,153,0.6)",
                boxShadow:
                  "0 12px 28px -10px rgba(16,185,129,0.55), inset 0 1px 0 rgba(255,255,255,0.25)",
              }
            : isCurrent
              ? {
                  backgroundColor:
                    "color-mix(in srgb, var(--ui-background-secondary) 88%, transparent)",
                  borderColor: palette.ring,
                  boxShadow: `${palette.ring ? `0 0 0 3px ${palette.bg}, 0 12px 28px -8px ${palette.chip}` : ""}, inset 0 1px 0 rgba(255,255,255,0.08)`,
                  backdropFilter: "blur(8px)",
                }
              : {
                  backgroundColor:
                    "color-mix(in srgb, var(--ui-background-secondary) 88%, transparent)",
                  borderColor: palette.ring,
                  boxShadow:
                    "0 12px 24px -12px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.08)",
                  backdropFilter: "blur(8px)",
                }
        }
      >
        {!isCompleted && (
          <>
            {isLocked ? (
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{
                  background:
                    "color-mix(in srgb, var(--ui-background-tertiary) 60%, transparent)",
                }}
              >
                <FaLock
                  className="text-2xl"
                  style={{ color: "var(--ui-text-muted)" }}
                />
              </div>
            ) : (
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
                style={{ background: palette.bg }}
              >
                <Icon
                  className="text-2xl transition-transform duration-300"
                  style={{ color: palette.dot }}
                />
              </div>
            )}

            <span
              className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
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
          <>
            <div className="flex flex-col items-center gap-1">
              <span
                className="w-12 h-12 rounded-full flex items-center justify-center text-white text-2xl"
                style={{
                  background: "rgba(255,255,255,0.2)",
                  boxShadow: "inset 0 2px 8px rgba(255,255,255,0.25)",
                  backdropFilter: "blur(4px)",
                }}
              >
                ✓
              </span>
              <span className="text-[9px] font-bold uppercase tracking-wider text-white/90">
                Пройдено
              </span>
            </div>
          </>
        )}

        <span
          className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white border-2 shadow-md"
          style={{
            background: isCompleted ? "#047857" : palette.dot,
            borderColor: "var(--ui-background)",
          }}
        >
          {stepNumber}
        </span>
      </div>

      <div className="absolute left-full top-1/2 -translate-y-1/2 ml-4 w-[200px] pointer-events-none">
        <div
          className="text-left py-1"
          style={{
            color: "var(--ui-text)",
          }}
        >
          <div className="text-[12px] font-bold leading-tight line-clamp-1">
            {title}
          </div>
          <div
            className="text-[10px] leading-tight mt-0.5"
            style={{ color: "var(--ui-text-muted)" }}
          >
            {description}
          </div>
        </div>
      </div>
    </div>
  );
};
