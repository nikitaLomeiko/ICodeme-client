"use client";

import React from "react";
import { motion } from "framer-motion";

interface InputWrapperProps {
  id: string;
  label: string;
  children: React.ReactNode;
  isFocused: boolean;
  hasValue: boolean;
  error?: string;
  required?: boolean;
}

export const InputWrapper: React.FC<InputWrapperProps> = ({
  id,
  label,
  children,
  isFocused,
  hasValue,
  error,
  required,
}) => {
  return (
    <div className="relative my-6">
      {children}
      <label
        htmlFor={id}
        className={`
          absolute left-10 transition-all pointer-events-none
          ${
            isFocused || hasValue
              ? "text-[12px] -top-[15px] text-emerald-600"
              : "text-sm text-gray-400 top-1/2 -translate-y-1/2"
          }
          ${error ? "text-red-500" : ""}
          ${required ? "after:content-['*'] after:ml-0.5 after:text-red-500" : ""}
        `}
      >
        {label}
      </label>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[10px] text-red-500 mt-1 ml-3"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};
