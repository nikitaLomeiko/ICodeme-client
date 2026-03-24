import { InputSize, InputVariant } from "../types/field.props";

export const baseStyles = `
  w-full bg-white border rounded-xl outline-none text-sm transition-all duration-200 text-gray-500
`;

export const sizeStyles: Record<InputSize, string> = {
  sm: "px-3 py-2 text-xs",
  md: "px-4 py-3 text-sm",
  lg: "px-5 py-4 text-base",
};

export const variantStyles: Record<InputVariant, string> = {
  primary: `
    !border-gray-200 
    !focus:border-emerald-500 
    !focus:ring-2 
    !focus:ring-emerald-500/20 
    !hover:border-emerald-300
  `,

  outline: `
    !border-2
    !border-gray-300 
    !bg-transparent
    !focus:border-emerald-500 
    !focus:ring-0 
    !hover:border-emerald-400
  `,

  standard: `
    !border-0
    !border-b-2
    !border-gray-300
    !rounded-none
    !bg-transparent 
    !focus:border-emerald-500 
    !focus:ring-2 
    !focus:ring-emerald-500/20 
    !hover:bg-gray-50
    !hover:border-gray-200
  `,
};

export const disabledStyles = "bg-gray-100 cursor-not-allowed opacity-60";

export const errorStyles =
  "!border-red-500 !focus:border-red-500 !focus:ring-2 !focus:ring-red-500/20";
