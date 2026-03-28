export const baseStyles = `
  w-full rounded-xl outline-none text-sm transition-all duration-200
  bg-[var(--ui-background)]
  text-black/80
  placeholder:text-gray-500]
`;

export const sizeStyles = {
  sm: "px-3 py-2 text-xs",
  md: "px-4 py-3 text-sm",
  lg: "px-5 py-4 text-base",
};

export const variantStyles = {
  square: `
    !border 
    !border-[var(--ui-border)] 
    !rounded-none
    !bg-[var(--ui-background)]
    !focus:border-[var(--ui-border-focus)] 
    !focus:ring-2 
    !focus:ring-[var(--ui-primary)]/20 
    !hover:border-[var(--ui-primary)]/50
    !hover:bg-[var(--ui-background-secondary)]
  `,

  rounded: `
    !border 
    !border-[var(--ui-border)] 
    !rounded-md
    !bg-[var(--ui-background)]
    !focus:border-[var(--ui-border-focus)] 
    !focus:ring-2 
    !focus:ring-[var(--ui-primary)]/20 
    !hover:border-[var(--ui-primary)]/50
    !hover:bg-[var(--ui-background-secondary)]
  `,

  pill: `
    !border 
    !border-[var(--ui-border)] 
    !rounded-full
    !bg-[var(--ui-background)]
    !focus:border-[var(--ui-border-focus)] 
    !focus:ring-2 
    !focus:ring-[var(--ui-primary)]/20 
    !hover:border-[var(--ui-primary)]/50
    !hover:bg-[var(--ui-background-secondary)]
  `,

  underline: `
    !border-0 
    !border-b-2 
    !border-[var(--ui-border)]
    !rounded-none 
    !bg-transparent 
    !px-0
    !focus:border-[var(--ui-border-focus)] 
    !focus:ring-0 
    !hover:border-[var(--ui-primary)]/50
  `,

  clean: `
    !border-0 
    !bg-transparent 
    !rounded-none 
    !shadow-none
    !focus:ring-0 
    !focus:outline-none
    !hover:bg-[var(--ui-background-secondary)]
    !hover:backdrop-blur-sm
  `,
};

export const disabledStyles =
  "!bg-[var(--ui-disabled)] !cursor-not-allowed !opacity-60";

export const errorStyles = `
  !border-[var(--ui-error)] 
  !focus:border-[var(--ui-error)] 
  !focus:ring-2 
  !focus:ring-[var(--ui-error)]/20
`;

export const textareaBaseStyles = `
  w-full rounded-xl outline-none text-sm transition-all duration-200 resize-none
  bg-[var(--ui-background)]
  text-black/80
  placeholder:text-gray-500
`;
