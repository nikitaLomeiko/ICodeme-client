"use client";

import React, { useEffect, useState } from "react";
import "./styles/theme.css";
import { ThemeEnum } from "./types/theme.typs";
import { ThemeContext } from "./context/theme.context";
import { getAvailableThemes } from "./lib/utils/getAvailableThemes";

interface UIThemeProviderProps {
  children: React.ReactNode;
  theme: ThemeEnum;
  limit?: number;
  availableThemes?: ThemeEnum[];
}

export const UIThemeProvider: React.FC<UIThemeProviderProps> = ({
  children,
  theme: initialTheme,
  limit,
  availableThemes: customThemes,
}) => {
  const [theme, setThemeState] = useState<ThemeEnum>(initialTheme);
  const availableThemes = customThemes || getAvailableThemes(limit);

  const setTheme = (newTheme: ThemeEnum) => {
    localStorage.setItem("data-theme", newTheme);
    setThemeState(newTheme);
  };

  useEffect(() => {
    const storageTheme = localStorage.getItem("data-theme") || theme;
    document.documentElement.setAttribute("data-theme", storageTheme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, availableThemes }}>
      {children}
    </ThemeContext.Provider>
  );
};
