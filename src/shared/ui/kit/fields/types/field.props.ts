import { InputHTMLAttributes } from "react";
import { InputMode, InputSize, InputVariant } from "./field.types";

export interface BaseInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "inputMode"
> {
  id: string;
  label: string;
  icon?: React.ElementType;
  error?: string;
  variant?: InputVariant;
  size?: InputSize;
  fullWidth?: boolean;
  disabled?: boolean;
  inputMode?: InputMode;
}
