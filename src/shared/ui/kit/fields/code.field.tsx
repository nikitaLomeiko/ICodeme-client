"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { InputSize, InputVariant } from "./types/field.props";
import {
  baseStyles,
  variantStyles,
  sizeStyles,
  disabledStyles,
  errorStyles,
} from "./styles/field.styles";

interface CodeFieldProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: string;
  className?: string;
  autoFocus?: boolean;
  variant?: InputVariant;
  size?: InputSize;
}

const CELL_SIZE: Record<InputSize, string> = {
  sm: "w-8 h-8 text-sm",
  md: "w-12 h-12 text-lg",
  lg: "w-16 h-16 text-xl",
};

export const CodeField: React.FC<CodeFieldProps> = ({
  length = 6,
  value,
  onChange,
  disabled = false,
  error,
  className = "",
  autoFocus = true,
  variant = "primary",
  size = "md",
}) => {
  const [code, setCode] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (value) {
      const valueArray = value.split("").slice(0, length);
      const newCode = [...code];
      valueArray.forEach((char, idx) => {
        newCode[idx] = char;
      });
      setCode(newCode);
    } else {
      setCode(Array(length).fill(""));
    }
  }, [value, length]);

  const handleChange = (index: number, inputValue: string) => {
    if (inputValue.length > 1) return;

    const newCode = [...code];
    newCode[index] = inputValue;
    setCode(newCode);
    onChange(newCode.join(""));

    if (inputValue && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, length);
    const pastedArray = pastedData.split("");
    const newCode = [...code];

    pastedArray.forEach((char, idx) => {
      if (idx < length) {
        newCode[idx] = char;
      }
    });

    setCode(newCode);
    onChange(newCode.join(""));

    const lastFilledIndex = Math.min(pastedArray.length, length - 1);
    inputRefs.current[lastFilledIndex]?.focus();
  };

  const getCellStyles = (index: number) => {
    return `
      ${baseStyles}
      text-center font-semibold border-2
      focus:ring-2 focus:border-transparent
      ${CELL_SIZE[size]}
      ${variantStyles[variant]}
      ${error ? errorStyles : ""}
      ${disabled ? disabledStyles : ""}
    `;
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex justify-between gap-2">
        {code.map((digit, index) => (
          <motion.div
            key={index}
            initial={false}
            animate={{
              scale: digit ? [1, 1.05, 1] : 1,
            }}
            transition={{ duration: 0.2 }}
          >
            <input
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              disabled={disabled}
              autoFocus={autoFocus && index === 0}
              className={getCellStyles(index)}
            />
          </motion.div>
        ))}
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[10px] text-red-500 text-center"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

CodeField.displayName = "CodeField";
