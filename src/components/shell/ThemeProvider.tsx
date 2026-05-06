"use client";
import * as React from "react";

type Theme = "light" | "dark";
type Ctx = { theme: Theme; setTheme: (t: Theme) => void; toggle: () => void };

const ThemeCtx = React.createContext<Ctx | null>(null);

export function useTheme() {
  const v = React.useContext(ThemeCtx);
  if (!v) throw new Error("useTheme must be used inside <ThemeProvider>");
  return v;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<Theme>(() => {
    if (typeof document === "undefined") return "light";
    return (document.documentElement.getAttribute("data-theme") as Theme) || "light";
  });

  const setTheme = React.useCallback((t: Theme) => {
    setThemeState(t);
    document.documentElement.setAttribute("data-theme", t);
    try { localStorage.setItem("theme", t); } catch {}
  }, []);

  const toggle = React.useCallback(() => setTheme(theme === "light" ? "dark" : "light"), [theme, setTheme]);

  return <ThemeCtx.Provider value={{ theme, setTheme, toggle }}>{children}</ThemeCtx.Provider>;
}

/**
 * Inline script to apply theme synchronously in <head>, before React hydrates.
 * Prevents FOUC. Reads localStorage("theme") → falls back to OS preference.
 */
export const themeBootScript = `
(function(){try{
  var t = localStorage.getItem('theme');
  if (!t) { t = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'; }
  document.documentElement.setAttribute('data-theme', t);
}catch(e){}})();
`;
