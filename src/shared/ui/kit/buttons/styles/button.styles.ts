export const baseStyles =
  "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

export const sizeStyles = {
  sm: "px-3 py-1.5 text-xs gap-1.5",
  md: "px-4 py-2 text-sm gap-2",
  lg: "px-6 py-3 text-base gap-2",
};

export const variantStyles = {
  primary:
    "bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:shadow-md hover:scale-[1.02] active:scale-[0.98]",
  outline:
    "border border-gray-300 bg-transperent text-gray-700 hover:bg-gray-50 hover:border-gray-400 hover:scale-[1.02] active:scale-[0.98]",
  ghost:
    "text-gray-600 hover:bg-gray-100 hover:text-gray-900 active:scale-[0.98]",
  danger:
    "bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-md hover:scale-[1.02] active:scale-[0.98]",
};
