"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { whyChooseUs } from "@/src/data/content";
import { useScrollAnimation } from "@/src/lib/useScrollAnimation";
import { fadeUp } from "@/src/lib/motion";

import type { Variants } from "framer-motion";

const reasonIcons: Record<string, React.ReactNode> = {
  "end-to-end": (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
    </svg>
  ),
  "land-development": (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2 20h20" /><path d="M5 20V8l4 4V8l4 4V4l4 4v12" /><path d="M19 20V10l-2-2" />
    </svg>
  ),
  quality: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  "customer-focus": (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
  "modern-planning": (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  transparency: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
    </svg>
  ),
};

const smoothEaseOut = [0.25, 0.1, 0.25, 1] as const;

/* ── Motion Variants for Premium Entrance Animation ── */
const gridStaggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
    },
  },
};

const cardEntranceVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    rotateY: 10,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateY: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: smoothEaseOut,
    },
  },
};

interface WhyChooseUsProps {
  id: string;
}

export default function WhyChooseUs({ id }: WhyChooseUsProps) {
  const { ref, inView } = useScrollAnimation<HTMLDivElement>({ threshold: 0.08 });

  return (
    <section
      id={id}
      className="section-padding px-6 md:px-8 lg:px-12 relative overflow-hidden
                 bg-deep-bg"
    >
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />

      {/* Decorative Gold Corner */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/[0.03] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-primary/[0.03] rounded-full translate-y-1/2 -translate-x-1/2" />

      <div ref={ref} className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0}
          className="text-center mb-14 lg:mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="divider-gold" />
            <span className="label-sm text-primary">Why Us</span>
            <div className="divider-gold" />
          </div>
          <h2 className="heading-xl text-3xl sm:text-4xl lg:text-5xl text-deep-text mb-6">
            Why Choose <span className="text-gold-gradient">SCE</span>
          </h2>
          <p className="text-deep-muted body-lg max-w-2xl mx-auto">
            Professional construction and land development backed by quality engineering, transparent management, and a commitment to every client
          </p>
        </motion.div>

        {/* Premium Section Hero Image */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0.1}
          className="relative mb-12 sm:mb-16 rounded-3xl overflow-hidden border border-deep-border shadow-xl aspect-[16/9] sm:aspect-[21/9] bg-surface-elevated"
        >
          <Image
            src="/images/why-choose-us.jpg"
            alt="SCE Construction site engineers and project managers reviewing architectural blueprints on site"
            fill
            quality={80}
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover object-center"
          />

          {/* Gradient Overlay for Contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

          {/* Glassmorphism Trust Badges Overlay */}
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-10 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl sm:rounded-2xl bg-black/50 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-semibold shadow-lg">
              <span className="w-5 h-5 rounded-full bg-primary/30 flex items-center justify-center text-primary text-xs flex-shrink-0">✓</span>
              <span>100+ Projects Delivered</span>
            </div>

            <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl sm:rounded-2xl bg-black/50 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-semibold shadow-lg">
              <span className="w-5 h-5 rounded-full bg-primary/30 flex items-center justify-center text-primary text-xs flex-shrink-0">✓</span>
              <span>Professional Engineering Standards</span>
            </div>

            <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl sm:rounded-2xl bg-black/50 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-semibold shadow-lg">
              <span className="w-5 h-5 rounded-full bg-primary/30 flex items-center justify-center text-primary text-xs flex-shrink-0">✓</span>
              <span>Transparent Project Management</span>
            </div>
          </div>
        </motion.div>

        {/* Reasons Grid with Premium Micro-Interactions & 3D Perspective Entrance */}
        <motion.div
          variants={gridStaggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 [perspective:1000px]"
        >
          {whyChooseUs.map((reason) => (
            <motion.div
              key={reason.id}
              variants={cardEntranceVariant}
              className="group p-5 sm:p-7 lg:p-8 rounded-2xl
                         bg-deep-surface border border-deep-border
                         hover:bg-deep-surface-hover hover:border-primary/40
                         hover:shadow-[0_16px_36px_-8px_rgba(214,160,23,0.25)]
                         hover:-translate-y-2 hover:scale-[1.02]
                         transition-all duration-300 ease-out cursor-default flex flex-col justify-between h-full"
            >
              <div>
                {/* Icon Container with Subtle 10° Rotate on Hover */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary/10 border border-primary/20
                              flex items-center justify-center text-primary mb-5 sm:mb-7 flex-shrink-0
                              transition-all duration-300 ease-out
                              group-hover:bg-primary/25 group-hover:scale-110 group-hover:rotate-12
                              group-hover:border-primary/40 group-hover:shadow-[0_0_15px_rgba(246,201,69,0.3)]">
                  {reasonIcons[reason.id] || <span className="text-xl sm:text-2xl">{reason.icon}</span>}
                </div>

                <h3 className="text-lg sm:text-xl font-semibold text-deep-text mb-3 sm:mb-4 transition-colors duration-300 group-hover:text-primary">
                  {reason.title}
                </h3>

                <p className="text-deep-muted body-relaxed text-xs sm:text-[0.9375rem] leading-relaxed">
                  {reason.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
