"use client";

import { useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef, type RefObject } from "react";

interface UseParallaxOptions {
  /** Parallax speed multiplier. Positive = element moves slower than scroll (default). */
  speed?: number;
  /** Scroll offset range for the element. Default covers full visibility. */
  offset?: ["start end" | "end start" | "start start" | "end end", "start end" | "end start" | "start start" | "end end"];
}

interface UseParallaxReturn<T extends HTMLElement> {
  ref: RefObject<T | null>;
  y: MotionValue<number>;
  scrollYProgress: MotionValue<number>;
}

/**
 * Smooth parallax scrolling hook built on Framer Motion.
 *
 * Usage:
 * ```tsx
 * const { ref, y } = useParallax<HTMLDivElement>({ speed: 0.3 });
 * <motion.div ref={ref} style={{ y }} />
 * ```
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(
  options: UseParallaxOptions = {},
): UseParallaxReturn<T> {
  const { speed = 0.3, offset = ["start end", "end start"] } = options;

  const ref = useRef<T | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });

  // Map scroll progress (0→1) to a parallax Y offset
  const range = 100 * speed;
  const y = useTransform(scrollYProgress, [0, 1], [range, -range]);

  return { ref, y, scrollYProgress };
}
