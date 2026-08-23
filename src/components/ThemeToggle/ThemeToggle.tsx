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
      className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center
                 bg-white/10 hover:bg-white/20 border border-white/15 text-white
                 transition-all duration-200 cursor-pointer
                 hover:scale-105 active:scale-95 shadow-sm"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {isDark ? (
        <Sun
          className="w-5 h-5 text-amber-400 transition-all duration-300 rotate-0 scale-100"
          strokeWidth={2}
          aria-hidden="true"
        />
      ) : (
        <Moon
          className="w-4.5 h-4.5 text-amber-300 transition-all duration-300 rotate-0 scale-100"
          strokeWidth={2}
          aria-hidden="true"
        />
      )}
    </button>
  );
}

