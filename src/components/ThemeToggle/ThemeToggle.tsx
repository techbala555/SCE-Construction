"use client";

import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
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

  const MotionSun = motion.create(Sun);
  const MotionMoon = motion.create(Moon);

  return (
    <button
      onClick={toggle}
      className="theme-toggle-btn relative w-12 h-12 rounded-full flex items-center justify-center
                 transition-all duration-300 cursor-pointer
                 hover:scale-105 active:scale-95"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <AnimatePresence mode="wait">
        {isDark ? (
          <MotionSun
            key="sun"
            className="w-5 h-5 text-amber-400"
            strokeWidth={2}
            aria-hidden="true"
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.25 }}
          />
        ) : (
          <MotionMoon
            key="moon"
            className="w-4.5 h-4.5 text-slate-700"
            strokeWidth={2}
            aria-hidden="true"
            initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.25 }}
          />
        )}
      </AnimatePresence>
    </button>
  );
}
