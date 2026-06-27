"use client";

import { motion } from "framer-motion";
import { services } from "@/src/data/content";
import { useScrollAnimation } from "@/src/lib/useScrollAnimation";
import { fadeUp, staggerContainer, staggerItem } from "@/src/lib/motion";

// Service-specific SVG icons
const serviceIcons: Record<string, React.ReactNode> = {
  residential: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  commercial: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="1" />
      <path d="M9 22V6h6v16" /><path d="M8 6h8" /><path d="M8 10h2" /><path d="M14 10h2" /><path d="M8 14h2" /><path d="M14 14h2" />
    </svg>
  ),
  industrial: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 20h20" /><path d="M5 20V8l4 4V8l4 4V4l4 4v12" /><path d="M19 20V10l-2-2" />
    </svg>
  ),
  renovation: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
    </svg>
  ),
  interior: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
    </svg>
  ),
  consulting: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><line x1="10" y1="9" x2="8" y2="9" />
    </svg>
  ),
};

interface ServicesProps {
  id: string;
}

export default function Services({ id }: ServicesProps) {
  const { ref, inView } = useScrollAnimation<HTMLDivElement>({ threshold: 0.08 });

  return (
    <section id={id} className="section-padding px-6 md:px-8 lg:px-12 bg-accent dark:bg-[#0C1726] relative overflow-hidden">
      {/* Decorative dots */}
      <div className="absolute inset-0 bg-dots-pattern opacity-30 dark:opacity-20" />

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
            <span className="label-sm text-primary">What We Do</span>
            <div className="divider-gold" />
          </div>
          <h2 className="heading-xl text-3xl sm:text-4xl lg:text-5xl text-foreground mb-6">
            Our Premium <span className="text-gold-gradient">Services</span>
          </h2>
          <p className="text-muted body-lg max-w-2xl mx-auto">
            Comprehensive construction solutions delivered with precision, expertise, and an unwavering commitment to excellence
          </p>
        </motion.div>

        {/* Services Grid — gap-8 (32px) */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={staggerItem}
              className="group p-8 rounded-2xl
                         bg-surface dark:bg-surface border border-border
                         card-hover cursor-default"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/10
                            flex items-center justify-center text-primary mb-7
                            transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-105">
                {serviceIcons[service.id] || <span className="text-2xl">{service.icon}</span>}
              </div>

              <h3 className="text-xl font-semibold text-foreground mb-4 heading-md">
                {service.title}
              </h3>

              <p className="text-muted body-relaxed text-[0.9375rem] leading-relaxed">
                {service.description}
              </p>

              {/* Learn More link */}
              <div className="mt-7 pt-6 border-t border-border">
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary
                               transition-all duration-300 group-hover:gap-2.5">
                  Learn More
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
