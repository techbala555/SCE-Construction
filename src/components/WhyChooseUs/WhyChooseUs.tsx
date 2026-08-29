"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  UsersRound,
  ClipboardCheck,
  Receipt,
  ShieldCheck,
  Building2,
  MapPin,
} from "lucide-react";
import { whyChooseUs } from "@/src/data/content";
import { useScrollAnimation } from "@/src/lib/useScrollAnimation";
import { fadeUp, staggerContainer, staggerItem } from "@/src/lib/motion";

const iconMap = {
  UsersRound: UsersRound,
  Receipt: Receipt,
  ClipboardCheck: ClipboardCheck,
  ShieldCheck: ShieldCheck,
} as const;

interface WhyChooseUsProps {
  id: string;
}

export default function WhyChooseUs({ id }: WhyChooseUsProps) {
  const { ref, inView } = useScrollAnimation<HTMLDivElement>({ threshold: 0.08 });

  return (
    <section
      id={id}
      className="section-padding px-6 md:px-8 lg:px-12 relative overflow-hidden
                 bg-background text-foreground"
    >
      {/* Subtle Background Blueprint / Grid Texture */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      {/* Ambient Lighting Orbs */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/[0.04] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-80 h-80 bg-primary/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div ref={ref} className="max-w-7xl mx-auto relative z-10">
        {/* ── Asymmetric Main 2-Column Grid ───────────────── */}
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-14 xl:gap-16 items-center">
          {/* ── LEFT COLUMN: Real Project Visual Story (~45%) ── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0}
            className="relative"
          >
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[4/5] bg-surface-elevated border border-border shadow-xl group">
              <Image
                src="/images/why-choose-us-real.webp"
                alt="Active residential house construction project in Tamil Nadu by SCE Developers"
                fill
                quality={85}
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 540px"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Bottom Dark Gradient for Badge Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

              {/* Top Accent Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/65 backdrop-blur-md border border-white/15 text-white/90 text-xs font-semibold shadow-md">
                  <ShieldCheck className="w-3.5 h-3.5 text-primary" strokeWidth={2} aria-hidden="true" />
                  <span>100% In-House Execution</span>
                </span>
              </div>

              {/* Bottom Proof Overlay */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-10 flex flex-wrap items-center justify-between gap-2.5">
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/75 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-bold tracking-wide shadow-lg">
                  <Building2 className="w-4 h-4 text-primary flex-shrink-0" strokeWidth={2} aria-hidden="true" />
                  <span>Real Project Execution</span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/75 backdrop-blur-md border border-white/20 text-[#F6C945] text-xs font-bold uppercase tracking-wider shadow-md">
                  <MapPin className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />
                  <span>Tamil Nadu</span>
                </div>
              </div>
            </div>

            {/* Decorative Offset Frame */}
            <div className="absolute -bottom-4 -right-4 w-full h-full rounded-2xl sm:rounded-3xl border-2 border-primary/15 -z-10 hidden sm:block pointer-events-none" />
          </motion.div>

          {/* ── RIGHT COLUMN: Content & 4 Horizontal Proof Rows (~55%) ── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0.1}
          >
            {/* Eyebrow / Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary-dark dark:text-primary text-xs font-bold uppercase tracking-wider mb-4">
              <ShieldCheck className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
              <span>Why Clients Trust SCE</span>
            </div>

            {/* Main Heading */}
            <h2 className="heading-xl text-3xl sm:text-4xl lg:text-[2.65rem] text-foreground font-extrabold leading-tight mb-4">
              Built on Experience.{" "}
              <span className="text-gold-gradient">Delivered with Trust.</span>
            </h2>

            {/* Supporting Description */}
            <p className="text-muted body-lg text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8 max-w-xl">
              From planning and approvals to structural construction and final handover, our in-house team manages every stage with clear communication and practical execution.
            </p>

            {/* 4 Compact Horizontal Proof Rows */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="space-y-3.5 sm:space-y-4"
            >
              {whyChooseUs.map((pillar) => {
                const IconComponent = iconMap[pillar.icon] || ShieldCheck;
                return (
                  <motion.div
                    key={pillar.id}
                    variants={staggerItem}
                    className="p-4 sm:p-4.5 rounded-2xl bg-surface-elevated border border-border/90
                               hover:border-primary/40 shadow-sm hover:shadow-md
                               transition-all duration-300 flex items-start gap-4 group"
                  >
                    {/* Consistent Icon Container */}
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-primary/10 border border-primary/20
                                  flex items-center justify-center flex-shrink-0 text-primary
                                  group-hover:bg-primary/20 group-hover:scale-105 transition-all duration-300">
                      <IconComponent className="w-5 h-5 text-primary" strokeWidth={2} aria-hidden="true" />
                    </div>

                    {/* Text Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm sm:text-base font-bold text-foreground group-hover:text-primary transition-colors">
                        {pillar.title}
                      </h3>
                      <p className="text-muted text-xs sm:text-sm leading-relaxed mt-0.5">
                        {pillar.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>

        {/* ── BOTTOM: Genuine Execution Commitments Strip ─────── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0.2}
          className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-border/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          <div className="p-4 sm:p-5 rounded-2xl bg-surface-elevated border border-border/80 hover:border-primary/30 transition-all duration-200 shadow-sm flex flex-col justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-primary">Single Contact</p>
              <h3 className="text-sm sm:text-base font-bold text-foreground mt-1">Dedicated Supervisor</h3>
            </div>
            <p className="text-[11px] sm:text-xs text-muted font-normal mt-2 leading-relaxed">
              Direct site engineer managing daily on-site updates and communication.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-surface-elevated border border-border/80 hover:border-primary/30 transition-all duration-200 shadow-sm flex flex-col justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-primary">Clear Pricing</p>
              <h3 className="text-sm sm:text-base font-bold text-foreground mt-1">Stage-Wise Billing</h3>
            </div>
            <p className="text-[11px] sm:text-xs text-muted font-normal mt-2 leading-relaxed">
              Payments tied to verified construction milestones with zero hidden fees.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-surface-elevated border border-border/80 hover:border-primary/30 transition-all duration-200 shadow-sm flex flex-col justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-primary">Material Standards</p>
              <h3 className="text-sm sm:text-base font-bold text-foreground mt-1">Quality Materials</h3>
            </div>
            <p className="text-[11px] sm:text-xs text-muted font-normal mt-2 leading-relaxed">
              Standardized concrete, steel, and branded material verification on site.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-surface-elevated border border-border/80 hover:border-primary/30 transition-all duration-200 shadow-sm flex flex-col justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-primary">Scheduled Delivery</p>
              <h3 className="text-sm sm:text-base font-bold text-foreground mt-1">Timely Handover</h3>
            </div>
            <p className="text-[11px] sm:text-xs text-muted font-normal mt-2 leading-relaxed">
              Structured timeline tracking from foundation work to final key handover.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
