import type { Variants } from "framer-motion";

// ── Easing Curves ───────────────────────────────────────────
const smooth = [0.33, 1, 0.68, 1] as const;
const smoothInOut = [0.65, 0, 0.35, 1] as const;

// ── Fade Up ─────────────────────────────────────────────────
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: smooth },
  }),
};

// ── Fade In ─────────────────────────────────────────────────
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.6, delay, ease: smoothInOut },
  }),
};

// ── Scale In ────────────────────────────────────────────────
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, delay, ease: smooth },
  }),
};

// ── Slide Left (enters from right) ──────────────────────────
export const slideLeft: Variants = {
  hidden: { opacity: 0, x: 80 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, delay, ease: smooth },
  }),
};

// ── Slide Right (enters from left) ──────────────────────────
export const slideRight: Variants = {
  hidden: { opacity: 0, x: -80 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, delay, ease: smooth },
  }),
};

// ── Stagger Container ───────────────────────────────────────
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

// ── Stagger Item ────────────────────────────────────────────
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: smooth },
  },
};

// ── Hero Text Reveal ────────────────────────────────────────
export const heroReveal: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      delay,
      ease: smooth,
    },
  }),
};

// ── Counter/Number Pop ──────────────────────────────────────
export const counterPop: Variants = {
  hidden: { opacity: 0, scale: 0.5, y: 20 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
      delay,
    },
  }),
};

// ── Float Animation ─────────────────────────────────────────
export const floatAnimation: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
    },
  },
};
