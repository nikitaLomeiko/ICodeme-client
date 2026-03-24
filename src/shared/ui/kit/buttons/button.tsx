"use client";

import React from "react";
import { motion } from "framer-motion";
import { BaseButtonProps } from "./types/button.props";
import { baseStyles, sizeStyles, variantStyles } from "./styles/button.styles";

export const Button: React.FC<BaseButtonProps> = ({
  variant = "primary",
  size = "md",
  isLoading = false,
  fullWidth = false,
  icon: Icon,
  iconPosition = "left",
  children,
  className = "",
  onClick,
  type = "button",
  disabled,
}) => {
  const widthStyle = fullWidth ? "w-full" : "";

  const buttonStyles = `
    ${baseStyles}
    ${sizeStyles[size]}
    ${variantStyles[variant]}
    ${widthStyle}
    ${className}
    cursor-pointer
  `;

  const content = (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center gap-2">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span>{children || "Загрузка..."}</span>
        </div>
      ) : (
        <>
          {Icon && iconPosition === "left" && (
            <Icon size={size === "sm" ? 14 : size === "md" ? 16 : 18} />
          )}
          {children}
          {Icon && iconPosition === "right" && (
            <Icon size={size === "sm" ? 14 : size === "md" ? 16 : 18} />
          )}
        </>
      )}
    </>
  );

  const isDisabled = disabled || isLoading;

  if (variant === "ghost") {
    return (
      <button
        type={type}
        className={buttonStyles}
        disabled={isDisabled}
        onClick={onClick}
      >
        {content}
      </button>
    );
  }

  return (
    <motion.button
      type={type}
      className={buttonStyles}
      disabled={isDisabled}
      onClick={onClick}
      whileHover={{ scale: isDisabled ? 1 : 1.02 }}
      whileTap={{ scale: isDisabled ? 1 : 0.98 }}
    >
      {content}
    </motion.button>
  );
};

Button.displayName = "Button";
