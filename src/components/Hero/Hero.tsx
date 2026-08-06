"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { heroContent, statistics } from "@/src/data/content";
import { heroReveal } from "@/src/lib/motion";
import { scrollToSection } from "@/src/lib/scrollToSection";

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
      <motion.div className="absolute inset-0 z-0 overflow-hidden" style={{ y: bgY }}>
        <Image
          src="/images/hero-bg.jpg"
          alt="Modern commercial building construction and civil engineering project"
          fill
          priority
          quality={85}
          sizes="100vw"
          className="object-cover object-center animate-ken-burns"
        />
      </motion.div>

      {/* Dark Overlay for max text readability & zero layout shift */}
      <div className="hero-overlay" />

      {/* Lightweight Ambient Light/Fog Particle Pulse */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        <div className="absolute -top-1/4 -left-1/4 w-[150%] h-[150%] bg-[radial-gradient(ellipse_at_top_right,rgba(246,201,69,0.12),transparent_60%)] animate-ambient-fog pointer-events-none" />
      </div>

      <div className="absolute inset-0 z-[2] bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent z-[3]" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent z-[3]" />

      {/* ── All content in normal document flow ──────────── */}
      <motion.div
        className="relative z-10 flex flex-col items-center flex-1 pt-28 sm:pt-36 md:pt-44 lg:pt-52 xl:pt-56 pb-10 md:pb-14"
        style={{ opacity }}
      >
        {/* ── Hero Text Block ──────────────────────────────── */}
        <div className="text-center px-4 sm:px-6 md:px-8 lg:px-12 max-w-5xl mx-auto">
          {/* Subtitle Badge */}
          <motion.div
            variants={heroReveal}
            initial="hidden"
            animate="visible"
            custom={0.2}
            className="inline-flex items-center gap-2.5 sm:gap-3 mb-6 sm:mb-8"
          >
            <span className="h-[1px] w-6 sm:w-10 bg-primary/60" />
            <span className="label-sm text-primary tracking-[0.15em] sm:tracking-[0.2em] text-xs sm:text-sm">
              {heroContent.subtitle}
            </span>
            <span className="h-[1px] w-6 sm:w-10 bg-primary/60" />
          </motion.div>

          {/* Main Title */}
          <motion.h1
            variants={heroReveal}
            initial="hidden"
            animate="visible"
            custom={0.4}
            className="heading-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6 sm:mb-8 leading-tight"
          >
            {heroContent.title}
            <br />
            <span className="text-gold-gradient">{heroContent.titleAccent}</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={heroReveal}
            initial="hidden"
            animate="visible"
            custom={0.6}
            className="text-white/70 text-sm sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 sm:mb-12 body-relaxed"
          >
            {heroContent.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={heroReveal}
            initial="hidden"
            animate="visible"
            custom={0.8}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-md sm:max-w-none mx-auto"
          >
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollToSection("#contact"); }}
              className="w-full sm:w-auto min-h-[52px] sm:min-h-[56px] flex items-center justify-center px-8 sm:px-10 py-3.5 text-sm sm:text-base font-semibold rounded-xl
                         bg-primary text-btn-text hover:bg-primary-dark
                         btn-shine transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]
                         shadow-lg shadow-primary/20"
            >
              {heroContent.ctaPrimary}
            </a>
            <a
              href="#projects"
              onClick={(e) => { e.preventDefault(); scrollToSection("#projects"); }}
              className="w-full sm:w-auto min-h-[52px] sm:min-h-[56px] flex items-center justify-center px-8 sm:px-10 py-3.5 text-sm sm:text-base font-semibold rounded-xl
                         border border-white/20 text-white hover:bg-white/10
                         transition-all duration-300 hover:border-white/40 group gap-2"
            >
              <span>{heroContent.ctaSecondary}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2} aria-hidden="true" />
            </a>
          </motion.div>
        </div>

        {/* ── Statistics Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 mt-10 sm:mt-14 lg:mt-20"
        >
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8
                       py-6 sm:py-8 px-4 sm:px-8 md:px-10 rounded-2xl
                       bg-white/[0.04] backdrop-blur-sm border border-white/[0.08]"
          >
            {statistics.map((stat) => (
              <div key={stat.label} className="text-center py-1">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <p className="text-white/60 text-xs sm:text-sm mt-2 sm:mt-3 font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Scroll Indicator - normal flow, mt-20 (80px) ── */}
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
