import { useCallback, useEffect, useMemo, useState } from "react";
import { ThemeProviderContext, type Theme } from "../lib/theme-context";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

const MEDIA = "(prefers-color-scheme: dark)";

const getSystemTheme = (): "light" | "dark" =>
  typeof window !== "undefined" && window.matchMedia(MEDIA).matches
    ? "dark"
    : "light";

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  storageKey = "strata-theme",
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") return defaultTheme;
    return (localStorage.getItem(storageKey) as Theme | null) ?? defaultTheme;
  });
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">(
    getSystemTheme,
  );

  // Derived during render — no setState inside an effect body.
  const resolvedTheme = theme === "system" ? systemTheme : theme;

  useEffect(() => {
    const mq = window.matchMedia(MEDIA);
    const onChange = (e: MediaQueryListEvent) =>
      setSystemTheme(e.matches ? "dark" : "light");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(resolvedTheme);
    root.style.colorScheme = resolvedTheme;
  }, [resolvedTheme]);

  const setTheme = useCallback(
    (next: Theme) => {
      localStorage.setItem(storageKey, next);
      setThemeState(next);
    },
    [storageKey],
  );

  const value = useMemo(
    () => ({ theme, setTheme, resolvedTheme }),
    [theme, setTheme, resolvedTheme],
  );

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}
