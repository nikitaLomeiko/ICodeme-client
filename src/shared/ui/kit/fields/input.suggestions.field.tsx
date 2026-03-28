"use client";

import React, { forwardRef, useState, useEffect, useRef } from "react";
import { InputWrapper } from "./wrapper/input.wrapper";
import { BaseInputProps } from "./types/field.props";
import {
  baseStyles,
  sizeStyles,
  variantStyles,
  disabledStyles,
  errorStyles,
} from "./styles/field.styles";
import { motion, AnimatePresence } from "framer-motion";

export interface InputWithSuggestionsProps extends Omit<
  BaseInputProps,
  "type"
> {
  suggestions: string[];
  onSelectSuggestion?: (value: string) => void;
  maxSuggestions?: number;
}

export const InputWithSuggestions = forwardRef<
  HTMLInputElement,
  InputWithSuggestionsProps
>((props, forwardedRef) => {
  const {
    id,
    label,
    value,
    onChange,
    onFocus,
    onBlur,
    required = false,
    disabled = false,
    error,
    variant = "rounded",
    size = "md",
    fullWidth = false,
    className = "",
    inputMode = "floating",
    placeholder,
    suggestions = [],
    onSelectSuggestion,
    maxSuggestions = 5,
    ...restProps
  } = props;

  const [internalValue, setInternalValue] = useState(value || "");
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const hasValue = String(internalValue || "").length > 0;

  const filteredSuggestions = suggestions
    .filter((s) =>
      String(s).toLowerCase().includes(String(internalValue).toLowerCase()),
    )
    .slice(0, maxSuggestions);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value);
    setShowSuggestions(true);
    setHighlightedIndex(-1);
    onChange?.(e);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    setShowSuggestions(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < filteredSuggestions.length - 1 ? prev + 1 : prev,
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightedIndex >= 0 && filteredSuggestions[highlightedIndex]) {
        selectSuggestion(filteredSuggestions[highlightedIndex]);
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  const selectSuggestion = (suggestion: string) => {
    setInternalValue(suggestion);
    setShowSuggestions(false);
    onSelectSuggestion?.(suggestion);

    const event = {
      target: { value: suggestion },
    } as React.ChangeEvent<HTMLInputElement>;
    onChange?.(event);
  };

  const inputStyles = `
      ${baseStyles}
      ${sizeStyles[size]}
      ${variantStyles[variant]}
      ${error ? errorStyles : ""}
      ${disabled ? disabledStyles : ""}
      ${fullWidth ? "w-full" : ""}
      ${className}
    `;

  return (
    <div ref={wrapperRef} className="relative">
      <InputWrapper
        id={id}
        label={label}
        isFocused={isFocused || showSuggestions}
        hasValue={hasValue}
        error={error}
        required={required}
        mode={inputMode}
        isIcon={false}
      >
        <input
          ref={forwardedRef}
          id={id}
          type="text"
          value={internalValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          required={required}
          disabled={disabled}
          className={inputStyles}
          placeholder={placeholder}
          autoComplete="off"
          {...restProps}
        />
      </InputWrapper>

      <AnimatePresence>
        {showSuggestions && filteredSuggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-1 bg-[var(--ui-background)] border border-[var(--ui-border)] rounded-lg shadow-lg max-h-48 overflow-y-auto"
          >
            {filteredSuggestions.map((suggestion, index) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => selectSuggestion(suggestion)}
                className={`
                    w-full px-4 py-2 text-left text-sm transition-colors
                    ${
                      index === highlightedIndex
                        ? "bg-[var(--ui-primary)]/10 text-[var(--ui-primary)]"
                        : "text-[var(--ui-text)] hover:bg-[var(--ui-background-secondary)]"
                    }
                  `}
              >
                {suggestion}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

InputWithSuggestions.displayName = "InputWithSuggestions";
