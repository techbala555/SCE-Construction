"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Clock3,
  Trophy,
  Users,
  Box,
  ShieldCheck,
  Building2,
  CheckCircle2,
} from "lucide-react";
import { whyChooseUs } from "@/src/data/content";
import { useScrollAnimation } from "@/src/lib/useScrollAnimation";
import { fadeUp } from "@/src/lib/motion";

import type { Variants } from "framer-motion";

// Lucide icon mapping matching prompt requirements
const reasonIcons: Record<string, React.ReactNode> = {
  experience: <Clock3 className="w-6 h-6 sm:w-7 sm:h-7 text-primary" strokeWidth={1.8} aria-hidden="true" />,
  delivered: <Trophy className="w-6 h-6 sm:w-7 sm:h-7 text-primary" strokeWidth={1.8} aria-hidden="true" />,
  team: <Users className="w-6 h-6 sm:w-7 sm:h-7 text-primary" strokeWidth={1.8} aria-hidden="true" />,
  "elevation-3d": <Box className="w-6 h-6 sm:w-7 sm:h-7 text-primary" strokeWidth={1.8} aria-hidden="true" />,
  quality: <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7 text-primary" strokeWidth={1.8} aria-hidden="true" />,
  "end-to-end": <Building2 className="w-6 h-6 sm:w-7 sm:h-7 text-primary" strokeWidth={1.8} aria-hidden="true" />,
};

const smoothEaseOut = [0.25, 0.1, 0.25, 1] as const;

/* ── Motion Variants for Lightweight Entrance Animation ── */
const gridStaggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardEntranceVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
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
                 bg-deep-bg text-deep-text"
    >
      {/* Subtle Blueprint/Grid Texture (2-3% opacity) */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />

      {/* Subtle Dark Gold Ambient Lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/[0.03] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/[0.02] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

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
            Over 10 years of experience, 100+ completed projects, quality construction materials, realistic 3D elevation designs, and honest execution.
          </p>
        </motion.div>

        {/* Premium Section Hero Image featuring Indian Civil Engineers & Architects */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0.1}
          className="relative mb-12 sm:mb-16 rounded-2xl sm:rounded-3xl overflow-hidden border border-deep-border/90 shadow-2xl aspect-[16/9] sm:aspect-[21/9] bg-surface-elevated group"
        >
          <Image
            src="/images/why-choose-us.webp"
            alt="Authentic Indian civil engineers and project managers reviewing architectural blueprints on active construction site"
            fill
            quality={80}
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          />

          {/* Dark Overlay Gradient for Optimal Text Contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

          {/* Glassmorphism Trust Badges Overlay */}
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-10 flex flex-wrap items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl sm:rounded-2xl bg-black/65 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-semibold shadow-lg">
              <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" strokeWidth={2} aria-hidden="true" />
              <span>10+ Years Experience</span>
            </div>

            <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl sm:rounded-2xl bg-black/65 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-semibold shadow-lg">
              <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" strokeWidth={2} aria-hidden="true" />
              <span>50+ Professional Team</span>
            </div>

            <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl sm:rounded-2xl bg-black/65 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-semibold shadow-lg">
              <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" strokeWidth={2} aria-hidden="true" />
              <span>100+ Projects Delivered</span>
            </div>
          </div>
        </motion.div>

        {/* 6 Why Choose Cards Grid */}
        <motion.div
          variants={gridStaggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {whyChooseUs.map((reason) => (
            <motion.div
              key={reason.id}
              variants={cardEntranceVariant}
              className="group p-6 sm:p-7 lg:p-8 rounded-2xl sm:rounded-3xl
                         bg-deep-surface/90 border border-deep-border/90
                         backdrop-blur-md shadow-md shadow-black/10
                         hover:bg-deep-surface-hover hover:border-primary/50
                         hover:shadow-[0_16px_36px_-8px_rgba(214,160,23,0.22)]
                         hover:-translate-y-[6px]
                         transition-all duration-300 ease-out cursor-pointer flex flex-col justify-between h-full"
            >
              <div>
                {/* Icon Container with Micro Scale Interaction */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-primary/10 border border-primary/20
                              flex items-center justify-center text-primary mb-5 sm:mb-6 flex-shrink-0
                              transition-all duration-300 ease-out
                              group-hover:bg-primary/20 group-hover:border-primary/40 group-hover:scale-110">
                  {reasonIcons[reason.id]}
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-deep-text mb-3 transition-colors duration-300 group-hover:text-primary">
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
