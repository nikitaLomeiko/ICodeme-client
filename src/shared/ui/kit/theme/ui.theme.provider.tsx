"use client";

import React, { createContext, useContext, useEffect } from "react";
import "./styles/theme.css";
import { ThemeEnum } from "./types/theme.typs";

interface ThemeContextType {
  theme: ThemeEnum;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
  theme: ThemeEnum;
}

export const UIThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  theme,
}) => {
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>
  );
};
