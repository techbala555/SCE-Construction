import { ArrowRight } from "lucide-react";
import { heroContent, statistics } from "@/src/data/content";
import AnimatedCounter from "./AnimatedCounter";

interface HeroProps {
  id: string;
}

export default function Hero({ id }: HeroProps) {
  return (
    <section
      id={id}
      className="relative min-h-screen flex flex-col overflow-hidden"
    >
      {/* ── Background layers (z-0 to z-[2]) ──────────────── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <picture className="block w-full h-full">
          <source media="(max-width: 767px)" srcSet="/images/hero-tamilnadu-house-mobile.webp" />
          <source media="(min-width: 768px)" srcSet="/images/hero-tamilnadu-house.webp" />
          <img
            src="/images/hero-tamilnadu-house.webp"
            alt="Modern independent house construction and civil engineering project in Tamil Nadu"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover object-center"
          />
        </picture>
      </div>

      {/* Dark Overlay for max text readability & zero layout shift */}
      <div className="hero-overlay" />

      {/* Lightweight Ambient Light/Fog Particle Pulse */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        <div className="absolute -top-1/4 -left-1/4 w-[150%] h-[150%] bg-[radial-gradient(ellipse_at_top_right,rgba(246,201,69,0.12),transparent_60%)] animate-ambient-fog pointer-events-none" />
      </div>

      <div className="absolute inset-0 z-[2] bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent z-[3]" />

      {/* ── All content in normal document flow ──────────── */}
      <div
        className="relative z-10 flex flex-col items-center flex-1 justify-center pt-24 sm:pt-28 md:pt-32 lg:pt-36 xl:pt-40 pb-10 md:pb-14"
      >
        {/* ── Hero Text Block ──────────────────────────────── */}
        <div className="text-center px-4 sm:px-6 md:px-8 lg:px-12 max-w-5xl mx-auto">
          {/* Subtitle Badge */}
          <div className="inline-flex items-center gap-2.5 sm:gap-3 mb-6 sm:mb-8">
            <span className="h-[1px] w-6 sm:w-10 bg-[#F6C945]/70" />
            <span className="text-[#F6C945] font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-xs sm:text-sm">
              {heroContent.subtitle}
            </span>
            <span className="h-[1px] w-6 sm:w-10 bg-[#F6C945]/70" />
          </div>

          {/* Main Title (LCP Element - Renders Immediately with 0ms Delay) */}
          <h1 className="heading-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6 sm:mb-8 leading-tight">
            {heroContent.title}
            <br />
            <span className="text-gold-gradient">{heroContent.titleAccent}</span>
          </h1>

          {/* Description */}
          <p className="text-white/70 text-sm sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 sm:mb-12 body-relaxed">
            {heroContent.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-md sm:max-w-none mx-auto">
            <a
              href="#contact"
              className="w-full sm:w-auto min-h-[52px] sm:min-h-[56px] flex items-center justify-center px-8 sm:px-10 py-3.5 text-sm sm:text-base font-semibold rounded-xl
                         bg-primary text-btn-text hover:bg-primary-dark
                         btn-shine transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]
                         shadow-lg shadow-primary/20"
            >
              {heroContent.ctaPrimary}
            </a>
            <a
              href="#projects"
              className="w-full sm:w-auto min-h-[52px] sm:min-h-[56px] flex items-center justify-center px-8 sm:px-10 py-3.5 text-sm sm:text-base font-semibold rounded-xl
                         border border-white/20 text-white hover:bg-white/10
                         transition-all duration-300 hover:border-white/40 group gap-2"
            >
              <span>{heroContent.ctaSecondary}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2} aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* ── Statistics Card ── */}
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 mt-10 sm:mt-14 lg:mt-20">
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
        </div>
      </div>
    </section>
  );
}

