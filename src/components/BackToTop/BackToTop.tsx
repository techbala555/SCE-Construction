"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useMounted } from "@/src/lib/useMounted";

const SCROLL_SHOW_THRESHOLD = 400; // Show after scrolling down 400px

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const mounted = useMounted();

  /* ── Optimised rAF-throttled Scroll Handler ───────────── */
  useEffect(() => {
    if (!mounted) return;

    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        setIsVisible((prev) => (prev !== (window.scrollY > SCROLL_SHOW_THRESHOLD) ? (window.scrollY > SCROLL_SHOW_THRESHOLD) : prev));
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // Initial check

    return () => window.removeEventListener("scroll", onScroll);
  }, [mounted]);

  /* ── Smooth Scroll to Top ─────────────────────────────── */
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 12 }}
          transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-[90]
                     w-[52px] h-[52px] sm:w-[56px] sm:h-[56px]
                     rounded-full bg-primary text-btn-text
                     flex items-center justify-center
                     shadow-lg shadow-primary/25
                     hover:bg-primary-dark hover:-translate-y-1 hover:scale-105
                     hover:shadow-[0_12px_28px_-4px_rgba(214,160,23,0.4)]
                     active:scale-95 transition-all duration-300 ease-out
                     cursor-pointer select-none
                     focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          aria-label="Back to top"
          title="Back to top"
        >
          <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
