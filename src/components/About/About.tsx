import Image from "next/image";
import {
  Compass,
  Zap,
  Users,
  ArrowRight,
  CheckCircle2,
  Trophy,
} from "lucide-react";

interface AboutProps {
  id: string;
}

const teamComposition = [
  {
    title: "Architects",
    icon: <Compass className="w-6 h-6 text-primary" strokeWidth={1.8} aria-hidden="true" />,
    description: "Experienced architects focused on practical floor plans, 3D elevation, and modern home designs.",
  },
  {
    title: "Electrical & MEP Engineers",
    icon: <Zap className="w-6 h-6 text-primary" strokeWidth={1.8} aria-hidden="true" />,
    description: "Electrical and MEP engineers handling safe wiring design, plumbing layouts, power planning, and safety checks.",
  },
  {
    title: "50+ Skilled Team",
    icon: <Users className="w-6 h-6 text-primary" strokeWidth={1.8} aria-hidden="true" />,
    description: "Civil engineers, site supervisors, project coordinators, and skilled construction workers.",
  },
];

export default function About({ id }: AboutProps) {
  return (
    <section id={id} className="section-padding px-6 md:px-8 lg:px-12 bg-background relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/[0.02] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/[0.02] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Grid: Content & Image */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-20 lg:mb-24">
          {/* Left - Content */}
          <div>
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
              Shylesh Circuit & Engineering provides integrated residential construction, architectural planning, and land development across Tamil Nadu. Our in-house team of architects, civil engineers, site supervisors, and skilled tradesmen works collaboratively under one roof to deliver durable, well-planned homes with structured execution and transparent pricing.
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
          </div>

          {/* Right - Visual */}
          <div className="relative">
            {/* Main Image */}
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-surface-elevated shadow-xl border border-border">
              <Image
                src="/images/about-engineering-team.webp"
                alt="Experienced Indian civil engineers and architects reviewing residential construction floor plans on site in Tamil Nadu - SCE Developers"
                fill
                quality={75}
                loading="lazy"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 550px"
                className="object-cover object-center transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Floating Execution Badge */}
            <div
              className="absolute -bottom-6 left-4 sm:-left-12 p-4 sm:p-5 rounded-2xl
                         bg-surface-elevated border border-border
                         shadow-large z-10 animate-float"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Trophy className="w-5 h-5 text-primary" strokeWidth={1.8} aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm sm:text-base font-extrabold text-foreground leading-snug">Integrated Team</p>
                  <p className="text-[11px] sm:text-xs text-muted font-medium mt-0.5">Design • Engineering • Handover</p>
                </div>
              </div>
            </div>

            {/* Decorative Border Accent */}
            <div className="absolute -top-4 -right-4 w-full h-full rounded-2xl border-2 border-primary/10 -z-10" />
          </div>
        </div>

        {/* ── Our Team & Execution Subsection ─────────────── */}
        <div className="pt-14 sm:pt-16 border-t border-border/80 relative">
          {/* Subtle blueprint grid line texture */}
          <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none rounded-3xl" />

          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14 relative z-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="divider-gold" />
              <span className="label-sm text-primary">OUR TEAM</span>
              <div className="divider-gold" />
            </div>
            <h3 className="heading-md text-2xl sm:text-3xl lg:text-4xl text-foreground mb-4">
              Experienced People. <span className="text-gold-gradient">Reliable Execution.</span>
            </h3>
            <p className="text-muted body-relaxed text-sm sm:text-base leading-relaxed">
              From planning and design to site execution and handover, our team brings together the expertise needed to deliver residential construction projects with care.
            </p>
          </div>

          {/* Team Cards Grid with Structured Hierarchy */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 relative z-10">
            {/* Card 1 — Architects */}
            <div
              className="group relative p-7 sm:p-8 rounded-2xl sm:rounded-3xl bg-surface-elevated
                         border border-border hover:border-primary/50
                         shadow-sm hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300
                         flex flex-col justify-between overflow-hidden"
            >
              {/* Subtle architectural corner grid accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/[0.03] rounded-bl-3xl border-b border-l border-primary/10 pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-13 h-13 rounded-2xl bg-primary/10 border border-primary/20
                                flex items-center justify-center text-primary
                                group-hover:bg-primary/20 group-hover:scale-105 transition-all duration-300">
                    <Compass className="w-6 h-6 text-primary" strokeWidth={1.8} aria-hidden="true" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-surface border border-border text-muted">
                    Design & Planning
                  </span>
                </div>

                <h4 className="text-lg sm:text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  Architects
                </h4>
                <p className="text-secondary text-sm leading-relaxed font-normal">
                  Experienced architects focused on practical floor plans, 3D elevation, and modern home designs.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border/70 flex items-center gap-2 text-xs font-bold text-primary-dark dark:text-primary">
                <span>Custom 2D Plans & 3D Visuals</span>
              </div>
            </div>

            {/* Card 2 — Electrical & MEP Engineers */}
            <div
              className="group relative p-7 sm:p-8 rounded-2xl sm:rounded-3xl bg-surface-elevated
                         border border-border hover:border-primary/50
                         shadow-sm hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300
                         flex flex-col justify-between overflow-hidden"
            >
              {/* Subtle technical circuit trace accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/[0.03] rounded-bl-3xl border-b border-l border-primary/10 pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-13 h-13 rounded-2xl bg-primary/10 border border-primary/20
                                flex items-center justify-center text-primary
                                group-hover:bg-primary/20 group-hover:scale-105 transition-all duration-300">
                    <Zap className="w-6 h-6 text-primary" strokeWidth={1.8} aria-hidden="true" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-surface border border-border text-muted">
                    Electrical & MEP
                  </span>
                </div>

                <h4 className="text-lg sm:text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  Electrical & MEP Engineers
                </h4>
                <p className="text-secondary text-sm leading-relaxed font-normal">
                  Electrical and MEP engineers handling safe wiring design, plumbing layouts, power planning, and utility safety checks.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border/70 flex items-center gap-2 text-xs font-bold text-primary-dark dark:text-primary">
                <span>Wiring, Plumbing & MEP Planning</span>
              </div>
            </div>

            {/* Card 3 — Site Engineers & Supervisors (Prominent Featured Card) */}
            <div
              className="group relative p-7 sm:p-8 rounded-2xl sm:rounded-3xl
                         bg-gradient-to-b from-surface-elevated to-primary/[0.04]
                         border-2 border-primary/40 hover:border-primary
                         shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300
                         flex flex-col justify-between overflow-hidden ring-1 ring-primary/20"
            >
              {/* Highlight badge top-right */}
              <div className="absolute -top-1 -right-1">
                <span className="inline-flex items-center px-3.5 py-1 rounded-bl-xl bg-primary text-btn-text text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider shadow-sm">
                  Field Operations
                </span>
              </div>

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-13 h-13 rounded-2xl bg-primary/15 border border-primary/30
                                flex items-center justify-center text-primary
                                group-hover:bg-primary/25 group-hover:scale-105 transition-all duration-300">
                    <Users className="w-6 h-6 text-primary" strokeWidth={2} aria-hidden="true" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary-dark dark:text-primary">
                    On-Site Execution
                  </span>
                </div>

                <h4 className="text-lg sm:text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  Site Engineers & Supervisors
                </h4>
                <p className="text-secondary text-sm leading-relaxed font-normal">
                  Civil engineers, site supervisors, project coordinators, and experienced construction tradesmen managing daily on-site quality and structural safety.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-primary/20 flex items-center gap-2 text-xs font-bold text-primary-dark dark:text-primary">
                <span>Civil, Structural & Site Supervision</span>
              </div>
            </div>
          </div>

          {/* ── Compact Execution Capability Strip ── */}
          <div className="mt-10 sm:mt-12 rounded-2xl sm:rounded-3xl bg-surface border border-border p-6 sm:p-8 relative z-10 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-border">
              <div className="text-center sm:text-left sm:pl-4 pt-2 sm:pt-0">
                <p className="text-base sm:text-lg font-bold text-foreground">Integrated Planning</p>
                <p className="text-xs text-muted mt-1 leading-relaxed">2D floor plans, 3D elevations & DTCP approval coordination</p>
              </div>

              <div className="text-center sm:text-left sm:pl-8 pt-4 sm:pt-0">
                <p className="text-base sm:text-lg font-bold text-foreground">Direct Site Supervision</p>
                <p className="text-xs text-muted mt-1 leading-relaxed">Civil engineers monitoring daily structural quality on site</p>
              </div>

              <div className="text-center sm:text-left sm:pl-8 pt-4 sm:pt-0">
                <p className="text-base sm:text-lg font-bold text-foreground">Turnkey Delivery</p>
                <p className="text-xs text-muted mt-1 leading-relaxed">Complete coordination from initial site survey to key handover</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

