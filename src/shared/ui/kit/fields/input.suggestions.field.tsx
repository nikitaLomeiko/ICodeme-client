"use client";

import React, { forwardRef } from "react";
import { InputWrapper } from "./wrapper/input.wrapper";
import { BaseInputProps } from "./types/field.props";
import {
  baseStyles,
  sizeStyles,
  variantStyles,
  disabledStyles,
  errorStyles,
} from "./styles/field.styles";
import { Suggestions } from "./ui/suggestions";
import { useSuggestions } from "./hooks/use.suggestions";
import { useFocused } from "./hooks/use.focused";
import { useInternal } from "./hooks/use.internal";

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

  const { handleBlur, handleFocus, isFocused } = useFocused({
    onFocus,
    onBlur,
  });

  const {
    internalValue,
    hasValue,
    handleChange: handleBaseChange,
    setInternalValue,
  } = useInternal({
    value,
    onChange,
  });

  const {
    handleChange,
    handleKeyDown,
    selectSuggestion,
    highlightedIndex,
    setShowSuggestions,
    showSuggestions,
    wrapperRef,
    filteredSuggestions,
  } = useSuggestions({
    internalValue,
    setInternalValue,
    suggestions,
    onChange,
    onSelectSuggestion,
  });

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
        labelSize={size}
      >
        <input
          ref={forwardedRef}
          id={id}
          type="text"
          value={internalValue}
          onChange={(e) => handleBaseChange(e, () => handleChange(e))}
          onFocus={(e) => handleFocus(e, () => setShowSuggestions(true))}
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

      <Suggestions
        suggestions={filteredSuggestions}
        showSuggestions={showSuggestions}
        highlightedIndex={highlightedIndex}
        selectSuggestion={selectSuggestion}
        internalValue={internalValue}
      />
    </div>
  );
});

InputWithSuggestions.displayName = "InputWithSuggestions";
