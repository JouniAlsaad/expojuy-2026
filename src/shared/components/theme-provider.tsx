"use client";

import { type ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { type Theme, ThemeContext } from "@/shared/hooks/use-theme";

const STORAGE_KEY = "expojuy-theme";

function applyTheme(theme: Theme): void {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

function readStoredTheme(): Theme {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "dark" || stored === "light") {
      return stored;
    }
  } catch {
    return "light";
  }
  return "light";
}

function persistTheme(theme: Theme): void {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    return;
  }
}

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    const initial = readStoredTheme();
    setThemeState(initial);
    applyTheme(initial);
  }, []);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    applyTheme(next);
    persistTheme(next);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((previous) => {
      const next: Theme = previous === "dark" ? "light" : "dark";
      applyTheme(next);
      persistTheme(next);
      return next;
    });
  }, []);

  const value = useMemo(() => ({ theme, setTheme, toggleTheme }), [theme, setTheme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
