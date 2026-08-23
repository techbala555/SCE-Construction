"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

interface UseScrollAnimationOptions {
  /** Fraction of the element that must be visible (0–1). Default: 0.15 */
  threshold?: number;
  /** Root margin string (CSS-like). Default: "0px 0px -60px 0px" */
  rootMargin?: string;
  /** If true, animation only triggers once. Default: true */
  triggerOnce?: boolean;
}

interface UseScrollAnimationReturn<T extends HTMLElement> {
  ref: RefObject<T | null>;
  inView: boolean;
}

/**
 * Lightweight Intersection Observer hook for scroll-triggered animations.
 *
 * Usage:
 * ```tsx
 * const { ref, inView } = useScrollAnimation<HTMLDivElement>();
 * <motion.div ref={ref} animate={inView ? "visible" : "hidden"} />
 * ```
 */
export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollAnimationOptions = {},
): UseScrollAnimationReturn<T> {
  const {
    threshold = 0.15,
    rootMargin = "0px 0px -60px 0px",
    triggerOnce = true,
  } = options;

  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setInView(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, inView };
}
