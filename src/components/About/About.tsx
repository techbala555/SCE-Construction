"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { companyInfo, statistics } from "@/src/data/content";
import { useScrollAnimation } from "@/src/lib/useScrollAnimation";
import { fadeUp, slideRight, slideLeft } from "@/src/lib/motion";

interface AboutProps {
  id: string;
}

export default function About({ id }: AboutProps) {
  const { ref: sectionRef, inView } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section id={id} className="section-padding px-6 md:px-8 lg:px-12 bg-background relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/[0.02] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/[0.02] rounded-full translate-y-1/2 -translate-x-1/2" />

      <div ref={sectionRef} className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left - Content */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0}
          >
            {/* Section Label */}
            <div className="flex items-center gap-3 mb-6">
              <div className="divider-gold" />
              <span className="label-sm text-primary">About Our Company</span>
            </div>

            <h2 className="heading-xl text-3xl sm:text-4xl lg:text-5xl text-foreground mb-6">
              We Build Dreams Into{" "}
              <span className="text-gold-gradient">Reality</span>
            </h2>

            <p className="text-muted body-lg mb-10 max-w-xl">
              {companyInfo.description}
            </p>

            {/* Mission & Vision */}
            <div className="space-y-6 mb-12">
              <div className="flex gap-5">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mt-0.5">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8v4l3 3" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Our Mission</h3>
                  <p className="text-muted body-relaxed text-[0.9375rem]">{companyInfo.mission}</p>
                </div>
              </div>
              <div className="flex gap-5">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mt-0.5">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Our Vision</h3>
                  <p className="text-muted body-relaxed text-[0.9375rem]">{companyInfo.vision}</p>
                </div>
              </div>
            </div>

            <a
              href="#services"
              className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold rounded-xl
                         bg-primary text-btn-text
                         hover:bg-primary-dark transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group"
            >
              Explore Our Services
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                className="transition-transform duration-300 group-hover:translate-x-1">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </motion.div>

          {/* Right - Visual */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0.2}
            className="relative"
          >
            {/* Main Image */}
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-surface-elevated shadow-xl border border-border">
              <Image
                src="/images/about-us.jpg"
                alt="Civil engineers inspecting architectural blueprint plans on construction site"
                fill
                quality={80}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Floating Stats Card */}
            <motion.div
              initial="initial"
              animate="animate"
              variants={{
                initial: { y: 0 },
                animate: {
                  y: [-6, 6, -6],
                  transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                },
              }}
              className="absolute -bottom-6 left-4 sm:-left-12 p-4 sm:p-6 rounded-2xl
                         bg-surface dark:bg-surface-elevated border border-border
                         shadow-large z-10"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl sm:text-2xl">🤝</span>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-foreground">{statistics[0].value}{statistics[0].suffix}</p>
                  <p className="text-[11px] sm:text-xs text-muted font-medium mt-0.5 sm:mt-1">{statistics[0].label}</p>
                </div>
              </div>
            </motion.div>

            {/* Decorative Border Accent */}
            <div className="absolute -top-4 -right-4 w-full h-full rounded-2xl border-2 border-primary/10 -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
