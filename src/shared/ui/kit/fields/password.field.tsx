"use client";

import React, { forwardRef, useState, useEffect } from "react";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { InputWrapper } from "./wrapper/input.wrapper";
import { BaseInputProps } from "./types/field.props";
import {
  baseStyles,
  sizeStyles,
  variantStyles,
  disabledStyles,
  errorStyles,
} from "./styles/field.styles";

interface PasswordFieldProps extends BaseInputProps {}

export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  (props, forwardedRef) => {
    const {
      id,
      label,
      value,
      onChange,
      onFocus,
      onBlur,
      icon: Icon = FaLock,
      required = false,
      placeholder,
      disabled = false,
      error,
      focusedField,
      setFocusedField,
      variant = "primary",
      size = "md",
      fullWidth = false,
      className = "",
      ...restProps
    } = props;

    const [showPassword, setShowPassword] = useState(false);
    const [internalValue, setInternalValue] = useState(value || "");

    useEffect(() => {
      if (value !== undefined) {
        setInternalValue(value);
      }
    }, [value]);

    const isFocused = focusedField === id;
    const hasValue = String(internalValue || "").length > 0;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInternalValue(e.target.value);
      onChange?.(e);
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setFocusedField(id);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setFocusedField(null);
      onBlur?.(e);
    };

    const inputStyles = `
      ${baseStyles}
      ${sizeStyles[size]}
      ${variantStyles[variant]}
      ${error ? errorStyles : ""}
      ${disabled ? disabledStyles : ""}
      ${fullWidth ? "w-full" : ""}
      pl-10 pr-10
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
      >
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10">
            <Icon size={16} />
          </div>
          <input
            ref={forwardedRef}
            id={id}
            type={showPassword ? "text" : "password"}
            value={internalValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            required={required}
            disabled={disabled}
            placeholder={placeholder}
            className={inputStyles}
            {...restProps}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            disabled={disabled}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
          >
            {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
          </button>
        </div>
      </InputWrapper>
    );
  },
);

PasswordField.displayName = "PasswordField";
