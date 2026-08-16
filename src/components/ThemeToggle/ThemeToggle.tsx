"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useMounted } from "@/src/lib/useMounted";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  if (!mounted) {
    return <div className="w-12 h-12 rounded-full bg-surface-elevated" aria-hidden="true" />;
  }

  const isDark = resolvedTheme === "dark";

  const toggle = () => {
    document.documentElement.classList.add("transitioning");
    setTheme(isDark ? "light" : "dark");
    setTimeout(() => {
      document.documentElement.classList.remove("transitioning");
    }, 500);
  };

  return (
    <button
      onClick={toggle}
      className="theme-toggle-btn relative w-12 h-12 rounded-full flex items-center justify-center
                 transition-all duration-300 cursor-pointer
                 hover:scale-105 active:scale-95"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {isDark ? (
        <Sun
          className="w-5 h-5 text-amber-400 transition-all duration-300 rotate-0 scale-100 opacity-100"
          strokeWidth={2}
          aria-hidden="true"
        />
      ) : (
        <Moon
          className="w-4.5 h-4.5 text-slate-700 transition-all duration-300 rotate-0 scale-100 opacity-100"
          strokeWidth={2}
          aria-hidden="true"
        />
      )}
    </button>
  );
}

