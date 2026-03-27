export enum ThemeEnum {
  LIGHT = "light",
  DARK = "dark",
  BLUE = "blue",
  PURPLE = "purple",
  YELLOW = "yellow",
  RED = "red",
  PINK = "pink",
  CYAN = "cyan",
  ORANGE = "orange",
  TEAL = "teal",
  GRAY = "gray",
}

export interface ThemeConfig {
  id: string;
  name: string;
  colors: {
    primary: string;
    primaryHover: string;
    primaryActive: string;
    secondary: string;
    accent: string;
    success: string;
    warning: string;
    error: string;
    info: string;
  };
  semantic: {
    background: string;
    backgroundSecondary: string;
    text: string;
    textSecondary: string;
    textMuted: string;
    border: string;
    borderFocus: string;
    placeholder: string;
    disabled: string;
  };
  brand: {
    gradientStart: string;
    gradientEnd: string;
    shadow: string;
  };
}
