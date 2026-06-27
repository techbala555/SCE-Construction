"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { heroContent, statistics } from "@/src/data/content";
import { heroReveal } from "@/src/lib/motion";

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = value / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-extrabold text-gold-gradient">
      {count}{suffix}
    </div>
  );
}

interface HeroProps {
  id: string;
}

export default function Hero({ id }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id={id}
      ref={containerRef}
      className="relative min-h-screen flex flex-col overflow-hidden"
    >
      {/* ── Background layers (z-0 to z-[2]) ──────────────── */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
          style={{ backgroundImage: "url('/images/hero-bg.png')" }}
        />
      </motion.div>
      <div className="hero-overlay" />
      <div className="absolute inset-0 z-[2] bg-grid-pattern opacity-40" />
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent z-[3]" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent z-[3]" />

      {/* ── All content in normal document flow ──────────── */}
      <motion.div
        className="relative z-10 flex flex-col items-center flex-1 pt-40 md:pt-48 lg:pt-52 xl:pt-60 pb-10 md:pb-14"
        style={{ opacity }}
      >
        {/* ── Hero Text Block ──────────────────────────────── */}
        <div className="text-center px-6 md:px-8 lg:px-12 max-w-5xl mx-auto">
          {/* Subtitle Badge — ↓ 32px */}
          <motion.div
            variants={heroReveal}
            initial="hidden"
            animate="visible"
            custom={0.2}
            className="inline-flex items-center gap-3 mb-8"
          >
            <span className="h-[1px] w-10 bg-primary/60" />
            <span className="label-sm text-primary tracking-[0.2em]">
              {heroContent.subtitle}
            </span>
            <span className="h-[1px] w-10 bg-primary/60" />
          </motion.div>

          {/* Main Title — ↓ 32px */}
          <motion.h1
            variants={heroReveal}
            initial="hidden"
            animate="visible"
            custom={0.4}
            className="heading-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-8"
          >
            {heroContent.title}
            <br />
            <span className="text-gold-gradient">{heroContent.titleAccent}</span>
          </motion.h1>

          {/* Description — ↓ 48px */}
          <motion.p
            variants={heroReveal}
            initial="hidden"
            animate="visible"
            custom={0.6}
            className="text-white/60 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-12 body-relaxed"
          >
            {heroContent.description}
          </motion.p>

          {/* CTA Buttons — fully visible, gap-6 desktop / gap-4 mobile */}
          <motion.div
            variants={heroReveal}
            initial="hidden"
            animate="visible"
            custom={0.8}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          >
            <a
              href="#contact"
              className="min-h-[56px] flex items-center justify-center px-10 py-4 text-sm sm:text-base font-semibold rounded-xl
                         bg-primary text-[#0B1F3A] hover:bg-primary-dark
                         btn-shine transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]
                         shadow-lg shadow-primary/20"
            >
              {heroContent.ctaPrimary}
            </a>
            <a
              href="#projects"
              className="min-h-[56px] flex items-center justify-center px-10 py-4 text-sm sm:text-base font-semibold rounded-xl
                         border border-white/20 text-white hover:bg-white/10
                         transition-all duration-300 hover:border-white/40 group"
            >
              {heroContent.ctaSecondary}
              <span className="inline-block ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </motion.div>
        </div>

        {/* ── Statistics Card — normal flow, mt-20 (80px) ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          className="w-full max-w-6xl mx-auto px-6 md:px-8 lg:px-12 mt-12 md:mt-16 lg:mt-20"
        >
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-8
                       py-8 px-8 md:px-10 rounded-2xl
                       bg-white/[0.04] backdrop-blur-sm border border-white/[0.08]"
          >
            {statistics.map((stat) => (
              <div key={stat.label} className="text-center py-1">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <p className="text-white/50 text-xs sm:text-sm mt-3 font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Scroll Indicator — normal flow, mt-20 (80px) ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="hidden md:flex flex-col items-center mt-12 lg:mt-20"
        >
          <span className="text-white/30 text-[10px] uppercase tracking-[0.25em] mb-3">
            Scroll
          </span>
          <div className="w-5 h-9 rounded-full border border-white/20 flex justify-center pt-2">
            <div className="w-1 h-2 rounded-full bg-primary animate-scroll-bounce" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
