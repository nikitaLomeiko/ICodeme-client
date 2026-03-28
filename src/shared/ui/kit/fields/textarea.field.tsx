"use client";

import React, { forwardRef, useEffect, useState, useRef } from "react";
import { InputWrapper } from "./wrapper/input.wrapper";
import { BaseTextareaProps } from "./types/field.props";
import {
  sizeStyles,
  variantStyles,
  disabledStyles,
  errorStyles,
  textareaBaseStyles,
} from "./styles/field.styles";

export const TextareaField = forwardRef<HTMLTextAreaElement, BaseTextareaProps>(
  (props, forwardedRef) => {
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
      rows = 4,
      maxLength,
      autoExpand = false,
      maxRows = 10,
      ...restProps
    } = props;

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [internalValue, setInternalValue] = useState(value || "");
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
      if (value !== undefined) {
        setInternalValue(value);
      }
    }, [value]);

    useEffect(() => {
      if (autoExpand && textareaRef.current) {
        const textarea = textareaRef.current;
        textarea.style.height = "auto";

        const computedStyle = window.getComputedStyle(textarea);
        const borderTopWidth = parseFloat(computedStyle.borderTopWidth) || 0;
        const borderBottomWidth =
          parseFloat(computedStyle.borderBottomWidth) || 0;
        const paddingTop = parseFloat(computedStyle.paddingTop) || 0;
        const paddingBottom = parseFloat(computedStyle.paddingBottom) || 0;

        const borderAndPadding =
          borderTopWidth + borderBottomWidth + paddingTop + paddingBottom;
        const lineHeight = parseFloat(computedStyle.lineHeight) || 20;

        const minRows = Math.min(rows, maxRows);
        const maxRowsLimit = maxRows;

        const contentHeight = textarea.scrollHeight - borderAndPadding;
        const minContentHeight = lineHeight * minRows + borderAndPadding;
        const maxContentHeight = lineHeight * maxRowsLimit + borderAndPadding;

        const newHeight = Math.max(
          minContentHeight,
          Math.min(contentHeight, maxContentHeight),
        );

        textarea.style.height = `${newHeight}px`;
      }
    }, [internalValue, autoExpand, rows, maxRows]);

    const hasValue = String(internalValue || "").length > 0;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInternalValue(e.target.value);
      onChange?.(e);
    };

    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const inputStyles = `
      ${textareaBaseStyles}
      ${sizeStyles[size]}
      ${variantStyles[variant]}
      ${error ? errorStyles : ""}
      ${disabled ? disabledStyles : ""}
      ${fullWidth ? "w-full" : ""}
      ${className}
    `;

    return (
      <InputWrapper
        id={id}
        label={label}
        isFocused={isFocused}
        hasValue={hasValue}
        error={error}
        required={required}
        mode={inputMode}
        isIcon={false}
      >
        <div className="relative">
          <textarea
            ref={(el) => {
              textareaRef.current = el;
              if (typeof forwardedRef === "function") {
                forwardedRef(el);
              } else if (forwardedRef) {
                forwardedRef.current = el;
              }
            }}
            id={id}
            value={internalValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            required={required}
            disabled={disabled}
            className={inputStyles}
            placeholder={placeholder}
            rows={rows}
            maxLength={maxLength}
            {...restProps}
          />
          {maxLength && (
            <span className="absolute bottom-2 right-2 text-[10px] text-gray-400">
              {String(internalValue).length}/{maxLength}
            </span>
          )}
        </div>
      </InputWrapper>
    );
  },
);

TextareaField.displayName = "TextareaField";
