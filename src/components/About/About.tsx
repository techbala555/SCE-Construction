"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Compass,
  PencilRuler,
  Zap,
  Users,
  ArrowRight,
  CheckCircle2,
  Trophy,
} from "lucide-react";
import { useScrollAnimation } from "@/src/lib/useScrollAnimation";
import { fadeUp, slideRight, slideLeft, staggerContainer, staggerItem } from "@/src/lib/motion";

interface AboutProps {
  id: string;
}

const teamComposition = [
  {
    title: "Architects",
    count: "2 Professionals",
    icon: <Compass className="w-6 h-6 text-primary" strokeWidth={1.8} aria-hidden="true" />,
    description: "Experienced architects focused on practical floor plans and modern home designs.",
  },
  {
    title: "Drawing Experts",
    count: "3 Professionals",
    icon: <PencilRuler className="w-6 h-6 text-primary" strokeWidth={1.8} aria-hidden="true" />,
    description: "CAD drawing specialists handling house plans, 3D elevation, and approval layouts.",
  },
  {
    title: "Circuit Engineers",
    count: "4 Professionals",
    icon: <Zap className="w-6 h-6 text-primary" strokeWidth={1.8} aria-hidden="true" />,
    description: "Electrical engineers handling safe wiring design, power planning, and safety checks.",
  },
  {
    title: "50+ Skilled Team",
    count: "Including Specialists",
    icon: <Users className="w-6 h-6 text-primary" strokeWidth={1.8} aria-hidden="true" />,
    description: "Civil engineers, site supervisors, project coordinators, and skilled construction workers.",
  },
];

export default function About({ id }: AboutProps) {
  const { ref: sectionRef, inView } = useScrollAnimation<HTMLDivElement>({ threshold: 0.08 });

  return (
    <section id={id} className="section-padding px-6 md:px-8 lg:px-12 bg-background relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/[0.02] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/[0.02] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div ref={sectionRef} className="max-w-7xl mx-auto relative z-10">
        {/* Main Grid: Content & Image */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-20 lg:mb-24">
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
              We Build Quality Homes &{" "}
              <span className="text-gold-gradient">Planned Layouts</span>
            </h2>

            <p className="text-muted body-lg mb-6 max-w-xl leading-relaxed">
              With over <strong>10 years of experience</strong>, Shylesh Circuits & Engineering is a trusted name in house construction, 3D elevation design, and land development across Tamil Nadu. Supported by a <strong>50+ skilled team</strong> of architects, civil engineers, site managers, and workers, we deliver quality construction with transparent pricing and on-time completion.
            </p>

            {/* Key Pillars */}
            <div className="space-y-5 mb-10">
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <CheckCircle2 className="w-5 h-5 text-primary" strokeWidth={2} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground">Experienced In-House Team</h3>
                  <p className="text-muted text-sm leading-relaxed">Architects, plan drawing experts, and civil engineers working together on your project.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <CheckCircle2 className="w-5 h-5 text-primary" strokeWidth={2} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground">Complete Project Support</h3>
                  <p className="text-muted text-sm leading-relaxed">From GPS land survey and DTCP approvals to 3D elevation and final house handover.</p>
                </div>
              </div>
            </div>

            <a
              href="#services"
              className="btn-shine inline-flex items-center gap-2.5 px-8 py-4 text-sm font-bold rounded-xl group"
            >
              <span>View Our Services</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2} aria-hidden="true" />
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
                alt="Indian civil engineers inspecting building plans on construction site"
                fill
                quality={85}
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
                  <Trophy className="w-6 h-6 text-primary" strokeWidth={1.8} aria-hidden="true" />
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-foreground">10+</p>
                  <p className="text-[11px] sm:text-xs text-muted font-medium mt-0.5 sm:mt-1">Years of Experience</p>
                </div>
              </div>
            </motion.div>

            {/* Decorative Border Accent */}
            <div className="absolute -top-4 -right-4 w-full h-full rounded-2xl border-2 border-primary/10 -z-10" />
          </motion.div>
        </div>

        {/* ── Meet Our Experienced Team Subsection ─────────────── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0.3}
          className="pt-10 border-t border-border/70"
        >
          <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="divider-gold" />
              <span className="label-sm text-primary">Our Team</span>
              <div className="divider-gold" />
            </div>
            <h3 className="heading-md text-2xl sm:text-3xl lg:text-4xl text-foreground mb-4">
              Meet Our <span className="text-gold-gradient">Experienced Team</span>
            </h3>
            <p className="text-muted body-relaxed text-sm sm:text-base">
              Our team of civil engineers, architects, survey experts, and skilled site workers work together to deliver every project with care.
            </p>
          </div>

          {/* Team Cards Grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6"
          >
            {teamComposition.map((member) => (
              <motion.div
                key={member.title}
                variants={staggerItem}
                className="group p-5 sm:p-6 rounded-2xl bg-surface/80 dark:bg-surface-elevated/70
                           backdrop-blur-md border border-border/80 hover:border-primary/40
                           shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20
                                flex items-center justify-center text-primary mb-4
                                group-hover:bg-primary/20 group-hover:scale-105 transition-all duration-300">
                    {member.icon}
                  </div>
                  <h4 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {member.title}
                  </h4>
                  <div className="text-xs font-extrabold text-primary uppercase tracking-wider mb-3">
                    {member.count}
                  </div>
                  <p className="text-muted text-xs sm:text-[0.875rem] leading-relaxed">
                    {member.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
