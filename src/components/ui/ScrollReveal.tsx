"use client";

import { motion, type Variants } from "framer-motion";
import { useScrollAnimation } from "@/src/lib/useScrollAnimation";
import { fadeUp } from "@/src/lib/motion";
import type { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  variants?: Variants;
  delay?: number;
  threshold?: number;
  className?: string;
}

export default function ScrollReveal({
  children,
  variants = fadeUp,
  delay = 0,
  threshold = 0.12,
  className = "",
}: ScrollRevealProps) {
  const { ref, inView } = useScrollAnimation<HTMLDivElement>({ threshold });

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={delay}
      className={className}
    >
      {children}
    </motion.div>
  );
}
