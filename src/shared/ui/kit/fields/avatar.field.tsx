"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export interface AvatarPickerProps {
  value?: string;
  onChange?: (color: string) => void;
  colors?: string[];
  size?: "sm" | "md" | "lg" | "xl";
  shape?: "circle" | "square" | "rounded";
  label?: string;
  error?: string;
  className?: string;
}

const sizeClasses = {
  sm: "w-8 h-8",
  md: "w-12 h-12",
  lg: "w-16 h-16",
  xl: "w-20 h-20",
};

const shapeClasses = {
  circle: "rounded-full",
  square: "rounded-none",
  rounded: "rounded-xl",
};

const defaultColors = [
  "#EF4444", // red-500
  "#F97316", // orange-500
  "#F59E0B", // amber-500
  "#84CC16", // lime-500
  "#10B981", // emerald-500
  "#14B8A6", // teal-500
  "#06B6D4", // cyan-500
  "#3B82F6", // blue-500
  "#6366F1", // indigo-500
  "#8B5CF6", // violet-500
  "#A855F7", // purple-500
  "#EC4899", // pink-500
  "#64748B", // slate-500
  "#0F172A", // slate-900
];

export const AvatarPicker: React.FC<AvatarPickerProps> = ({
  value,
  onChange,
  colors = defaultColors,
  size = "lg",
  shape = "circle",
  label,
  error,
  className = "",
}) => {
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);

  const handleSelect = (color: string) => {
    onChange?.(color);
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-[12px] mb-2 text-[var(--ui-text-muted)]">
          {label}
        </label>
      )}
      
      <div className="flex flex-wrap gap-2">
        {colors.map((color, index) => {
          const isSelected = value === color;
          const shapeClass = shapeClasses[shape];
          const sizeClass = sizeClasses[size];

          return (
            <motion.button
              key={color}
              type="button"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => setHoveredColor(color)}
              onMouseLeave={() => setHoveredColor(null)}
              onClick={() => handleSelect(color)}
              className={`
                ${sizeClass}
                ${shapeClass}
                transition-all duration-200
                ${
                  isSelected
                    ? "ring-2 ring-[var(--ui-primary)] ring-offset-2 ring-offset-[var(--ui-background)]"
                    : ""
                }
                ${
                  hoveredColor === color && !isSelected
                    ? "ring-2 ring-[var(--ui-primary)]/50 ring-offset-2 ring-offset-[var(--ui-background)]"
                    : ""
                }
              `}
              style={{ backgroundColor: color }}
              aria-label={`Select ${color} avatar`}
              aria-pressed={isSelected}
            />
          );
        })}
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[10px] text-[var(--ui-error)] mt-2"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};
