import { useCallback, useEffect, useMemo, useState } from "react";
import { flushSync } from "react-dom";
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

const applyTheme = (resolved: "light" | "dark") => {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(resolved);
  root.style.colorScheme = resolved;
};

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
    applyTheme(resolvedTheme);
  }, [resolvedTheme]);

  const setTheme = useCallback(
    (next: Theme) => {
      localStorage.setItem(storageKey, next);

      // Swapping the class restyles every specimen on the page at once, and
      // the half-repainted frame in the middle of that is what reads as a
      // stutter. A view transition holds a snapshot over the recalc so it
      // never shows. The animations are cancelled in CSS, so the transition
      // ends on the next frame and the swap still looks instant.
      if (typeof document.startViewTransition !== "function") {
        setThemeState(next);
        return;
      }

      const nextResolved = next === "system" ? getSystemTheme() : next;
      const transition = document.startViewTransition(() => {
        // The snapshot is taken before this callback and the next one after
        // it, so both the state and the class have to land synchronously.
        flushSync(() => {
          setThemeState(next);
          applyTheme(nextResolved);
        });
      });

      // Toggling twice in the same frame skips the running transition, which
      // rejects both of its promises. The swap itself still lands; swallow
      // the rejections so it doesn't log an unhandled one.
      transition.ready.catch(() => {});
      transition.finished.catch(() => {});
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
