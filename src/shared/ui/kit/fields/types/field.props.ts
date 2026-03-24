import { InputHTMLAttributes } from "react";

export type InputVariant = "primary" | "outline" | "standard";

export type InputSize = "sm" | "md" | "lg";

export interface BaseInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size"
> {
  id: string;
  label: string;
  icon?: React.ElementType;
  error?: string;
  focusedField: string | null;
  setFocusedField: (field: string | null) => void;
  variant?: InputVariant;
  size?: InputSize;
  fullWidth?: boolean;
  disabled?: boolean;
}
