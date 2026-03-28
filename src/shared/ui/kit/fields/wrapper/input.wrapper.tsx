"use client";

import React from "react";
import { motion } from "framer-motion";
import { InputMode } from "../types";

interface InputWrapperProps {
  id: string;
  label: string;
  children: React.ReactNode;
  isFocused: boolean;
  hasValue: boolean;
  error?: string;
  required?: boolean;
  mode?: InputMode;
  isIcon?: boolean;
}

export const InputWrapper: React.FC<InputWrapperProps> = ({
  id,
  label,
  children,
  isFocused,
  hasValue,
  error,
  required,
  mode = "floating",
  isIcon = false,
}) => {
  if (mode === "placeholder") {
    return (
      <div className="relative">
        {children}
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] text-[var(--ui-error)] mt-1 ml-3"
          >
            {error}
          </motion.p>
        )}
      </div>
    );
  }

  if (mode === "static") {
    return (
      <div className="relative">
        <label
          htmlFor={id}
          className={`
            block text-[12px] mb-1 text-[var(--ui-text-secondary)]
            ${error ? "text-[var(--ui-error)]" : ""}
            ${required ? "after:content-['*'] after:ml-0.5 after:text-[var(--ui-error)]" : ""}
          `}
        >
          {label}
        </label>
        {children}
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] text-[var(--ui-error)] mt-1 ml-3"
          >
            {error}
          </motion.p>
        )}
      </div>
    );
  }

  return (
    <div className="relative my-6">
      {children}
      <label
        htmlFor={id}
        className={`
          absolute ${isIcon ? "left-10" : "left-5"} transition-all pointer-events-none
          ${
            isFocused || hasValue
              ? "text-[12px] -top-[15px] text-[var(--ui-text-muted)]"
              : "text-sm text-[var(--ui-text-muted)] top-3"
          }
          ${error ? "!text-[var(--ui-error)]" : ""}
          ${required ? "after:content-['*'] after:ml-0.5 after:text-[var(--ui-error)]" : ""}
        `}
      >
        {label}
      </label>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[10px] text-[var(--ui-error)] mt-1 ml-1"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};
