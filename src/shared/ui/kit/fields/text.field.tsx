"use client";

import { forwardRef } from "react";
import { InputWrapper } from "./wrapper/input.wrapper";
import { BaseInputProps } from "./types/field.props";
import {
  baseStyles,
  sizeStyles,
  variantStyles,
  disabledStyles,
  errorStyles,
} from "./styles/field.styles";
import { useFocused } from "./hooks/use.focused";
import { useInternal } from "./hooks/use.internal";

export const TextField = forwardRef<HTMLInputElement, BaseInputProps>(
  (props, forwardedRef) => {
    const {
      id,
      label,
      type = "text",
      value,
      onChange,
      onFocus,
      onBlur,
      icon: Icon,
      required = false,
      disabled = false,
      error,
      variant = "rounded",
      size = "md",
      fullWidth = false,
      className = "",
      inputMode = "floating",
      placeholder,
      ...restProps
    } = props;

    const { handleChange, hasValue, internalValue } = useInternal({
      value,
      onChange,
    });
    const { handleBlur, handleFocus, isFocused } = useFocused({
      onFocus,
      onBlur,
    });

    const inputStyles = `
      ${baseStyles}
      ${sizeStyles[size]}
      ${variantStyles[variant]}
      ${error ? errorStyles : ""}
      ${disabled ? disabledStyles : ""}
      ${fullWidth ? "w-full" : ""}
      ${Icon ? "pl-10" : ""}
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
        isIcon={!!Icon}
        labelSize={size}
      >
        <div className="relative">
          {Icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10">
              <Icon size={16} />
            </div>
          )}
          <input
            ref={forwardedRef}
            id={id}
            type={type}
            value={internalValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            required={required}
            disabled={disabled}
            className={inputStyles}
            placeholder={placeholder}
            {...restProps}
          />
        </div>
      </InputWrapper>
    );
  },
);

TextField.displayName = "TextField";
