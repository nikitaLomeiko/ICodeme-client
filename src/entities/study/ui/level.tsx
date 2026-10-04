import React from "react";
import { ILevel } from "../model";
import { FaPuzzlePiece } from "react-icons/fa";

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

  return (
    <div key={id} className="relative mb-20 last:mb-0">
      <div className="relative mb-10">
        <div className="flex items-center gap-4 px-6 py-4 rounded-2xl">
          <span
            className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, var(--ui-primary), var(--ui-secondary))",
              boxShadow: "var(--ui-brand-shadow)",
              flexShrink: 0,
            }}
          >
            {index}
          </span>
          <div className="min-w-0">
            <h3
              className="text-xl font-bold leading-tight"
              style={{ color: "var(--ui-text)" }}
            >
              {title}
            </h3>
            <p
              className="text-sm mt-0.5"
              style={{ color: "var(--ui-text-muted)" }}
            >
              {description}
            </p>
          </div>
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <span
              className="text-xs px-3 py-1.5 rounded-full border font-medium flex items-center gap-1.5"
              style={{
                color: "var(--ui-text-muted)",
                backgroundColor:
                  "color-mix(in srgb, var(--ui-background-secondary) 70%, transparent)",
                borderColor: "var(--ui-border)",
              }}
            >
              <FaPuzzlePiece className="text-[10px]" />
              {steps.length} шагов
            </span>
          </div>
        </div>
        <div
          className="absolute left-0 right-6 bottom-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, var(--ui-primary), var(--ui-border), transparent)",
            opacity: 0.4,
          }}
        />
      </div>

      <div
        className="relative rounded-[2rem]"
        style={{
          minHeight: maxY,
          minWidth: maxX,
          width: "100%",
        }}
      >
        {children}
      </div>
    </div>
  );
};
