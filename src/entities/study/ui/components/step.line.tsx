import { IStepByLevel } from "../../model";

interface IProps {
  levelSteps: IStepByLevel[];
}

export const StepLine: React.FC<IProps> = ({ levelSteps }) => {
  if (levelSteps.length < 2) return null;

  const sortedSteps = [...levelSteps].sort(
    (a, b) => a.stepIndexInLevel - b.stepIndexInLevel,
  );

  const points = sortedSteps.map((item) => {
    const pos = item.step.position || { x: 100, y: 100 };
    return {
      x: pos.x + 60,
      y: pos.y + 60,
    };
  });

  const lineColor =
    document.documentElement.getAttribute("data-theme") === "dark"
      ? "rgba(148,163,184,0.35)"
      : "rgba(100,116,139,0.35)";

  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const midX = (prev.x + curr.x) / 2;
    const waveOffset = 30 + (i % 2) * 20;
    const cp1x = midX - 15 + (i % 2) * 30;
    const cp1y = prev.y - waveOffset + (i % 2) * (waveOffset * 2);
    const cp2x = midX + 15 - (i % 2) * 30;
    const cp2y = curr.y - waveOffset + (i % 2) * (waveOffset * 2);
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`;
  }

  return (
    <svg
      className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible"
      style={{ zIndex: 1 }}
    >
      <defs>
        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={lineColor} />
          <stop offset="50%" stopColor={lineColor} stopOpacity="0.45" />
          <stop offset="100%" stopColor={lineColor} />
        </linearGradient>
      </defs>
      <path
        d={d}
        stroke="url(#lineGrad)"
        strokeWidth="2.5"
        strokeDasharray="6 7"
        strokeLinecap="round"
        fill="none"
        className="transition-all duration-300"
      />
      {points.map(
        (point, idx) =>
          idx > 0 &&
          idx < points.length - 1 && (
            <circle
              key={idx}
              cx={point.x}
              cy={point.y}
              r="4"
              fill={lineColor}
              opacity="0.5"
            />
          ),
      )}
    </svg>
  );
};
