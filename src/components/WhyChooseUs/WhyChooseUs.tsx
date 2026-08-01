"use client";

import { motion } from "framer-motion";
import { whyChooseUs } from "@/src/data/content";
import { useScrollAnimation } from "@/src/lib/useScrollAnimation";
import { fadeUp, staggerContainer, staggerItem } from "@/src/lib/motion";

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

interface WhyChooseUsProps {
  id: string;
}

export default function WhyChooseUs({ id }: WhyChooseUsProps) {
  const { ref, inView } = useScrollAnimation<HTMLDivElement>({ threshold: 0.08 });

  return (
    <section
      id={id}
      className="section-padding px-6 md:px-8 lg:px-12 relative overflow-hidden
                 bg-secondary dark:bg-[#060E1A]"
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
          <h2 className="heading-xl text-3xl sm:text-4xl lg:text-5xl text-white mb-6">
            Why Choose <span className="text-gold-gradient">SCE</span>
          </h2>
          <p className="text-white/50 body-lg max-w-2xl mx-auto">
            Professional construction and land development backed by quality engineering, transparent management, and a commitment to every client
          </p>
        </motion.div>

        {/* Reasons Grid — gap-8 (32px) */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {whyChooseUs.map((reason) => (
            <motion.div
              key={reason.id}
              variants={staggerItem}
              className="group p-8 rounded-2xl
                         bg-white/[0.04] border border-white/[0.08]
                         hover:bg-white/[0.07] hover:border-primary/20
                         transition-all duration-400 cursor-default"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/15
                            flex items-center justify-center text-primary mb-7
                            transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-105">
                {reasonIcons[reason.id] || <span className="text-2xl">{reason.icon}</span>}
              </div>

              <h3 className="text-xl font-semibold text-white mb-4">
                {reason.title}
              </h3>

              <p className="text-white/50 body-relaxed text-[0.9375rem]">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
