"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Building2,
  MapPinned,
  Building,
  Trees,
  Box,
  ArrowRight,
} from "lucide-react";
import { services, serviceDetails, type ServiceDetail } from "@/src/data/content";
import { useScrollAnimation } from "@/src/lib/useScrollAnimation";
import { fadeUp, staggerContainer, staggerItem } from "@/src/lib/motion";

const ServiceModal = dynamic(() => import("./ServiceModal"), { ssr: false });

// Service-specific Lucide React icons
const serviceIcons: Record<string, React.ReactNode> = {
  construction: <Building2 className="w-6 h-6 text-primary" strokeWidth={1.8} aria-hidden="true" />,
  "land-development": <MapPinned className="w-6 h-6 text-primary" strokeWidth={1.8} aria-hidden="true" />,
  "real-estate": <Building className="w-6 h-6 text-primary" strokeWidth={1.8} aria-hidden="true" />,
  "future-projects": <Trees className="w-6 h-6 text-primary" strokeWidth={1.8} aria-hidden="true" />,
  "elevation-3d": <Box className="w-6 h-6 text-primary" strokeWidth={1.8} aria-hidden="true" />,
};

// Service banner images
const serviceBanners: Record<string, { src: string; alt: string }> = {
  construction: {
    src: "/images/projects/villa-project.webp",
    alt: "Luxury residential building and villa construction by SCE Developers",
  },
  "land-development": {
    src: "/images/projects/layout-development.webp",
    alt: "Professional land development, GPS survey, and site planning",
  },
  "real-estate": {
    src: "/images/projects/plot-development.webp",
    alt: "Strategic plot promotion and residential layout development",
  },
  "future-projects": {
    src: "/images/services/farmhouse.webp",
    alt: "Specialized farmhouse planning, construction, and estate development",
  },
  "elevation-3d": {
    src: "/images/services/elevation-3d.webp",
    alt: "Photorealistic 3D elevation and exterior facade rendering by SCE Developers",
  },
};

const serviceRoutes: Record<string, string> = {
  construction: "/services/house-construction",
  "land-development": "/services/land-development",
  "real-estate": "/services/plot-promotion",
  "future-projects": "/services/farmhouse-projects",
  "elevation-3d": "/services/3d-elevation-design",
};

interface ServicesProps {
  id: string;
}

export default function Services({ id }: ServicesProps) {
  const { ref, inView } = useScrollAnimation<HTMLDivElement>({ threshold: 0.08 });
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);

  const handleGetQuote = () => {
    setSelectedService(null);
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id={id} className="section-padding px-6 md:px-8 lg:px-12 bg-accent relative overflow-hidden">
      {/* Decorative background grid pattern */}
      <div className="absolute inset-0 bg-dots-pattern opacity-30 dark:opacity-20 pointer-events-none" />

      <div ref={ref} className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0}
          className="text-center mb-10 lg:mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="divider-gold" />
            <span className="label-sm text-primary">What We Do</span>
            <div className="divider-gold" />
          </div>
          <h2 className="heading-xl text-3xl sm:text-4xl lg:text-5xl text-foreground mb-6">
            Our Professional <span className="text-gold-gradient">Services</span>
          </h2>
          <p className="text-muted body-lg max-w-2xl mx-auto">
            We offer complete house construction, 3D elevation design, and land layout development with quality materials, clear pricing, and on-time delivery.
          </p>
        </motion.div>

        {/* Compact Trust Metrics Row */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0.1}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 mb-12 sm:mb-16"
        >
          <div className="p-4 sm:p-4.5 rounded-2xl bg-surface border border-border/80 shadow-sm flex items-center gap-3.5 sm:gap-4 h-full min-h-[76px]">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-extrabold text-sm sm:text-base flex-shrink-0 leading-none select-none">
              100+
            </div>
            <div className="flex flex-col justify-center min-w-0 flex-1">
              <div className="text-xs sm:text-sm font-bold text-foreground truncate leading-snug">Projects Delivered</div>
              <div className="text-[11px] sm:text-xs text-muted truncate mt-1 leading-none font-medium">Turnkey Quality</div>
            </div>
          </div>

          <div className="p-4 sm:p-4.5 rounded-2xl bg-surface border border-border/80 shadow-sm flex items-center gap-3.5 sm:gap-4 h-full min-h-[76px]">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-extrabold text-sm sm:text-base flex-shrink-0 leading-none select-none">
              10+
            </div>
            <div className="flex flex-col justify-center min-w-0 flex-1">
              <div className="text-xs sm:text-sm font-bold text-foreground truncate leading-snug">Years Experience</div>
              <div className="text-[11px] sm:text-xs text-muted truncate mt-1 leading-none font-medium">Proven Track Record</div>
            </div>
          </div>

          <div className="p-4 sm:p-4.5 rounded-2xl bg-surface border border-border/80 shadow-sm flex items-center gap-3.5 sm:gap-4 h-full min-h-[76px]">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-extrabold text-sm sm:text-base flex-shrink-0 leading-none select-none">
              50+
            </div>
            <div className="flex flex-col justify-center min-w-0 flex-1">
              <div className="text-xs sm:text-sm font-bold text-foreground truncate leading-snug">Professional Team</div>
              <div className="text-[11px] sm:text-xs text-muted truncate mt-1 leading-none font-medium">In-House Experts</div>
            </div>
          </div>

          <div className="p-4 sm:p-4.5 rounded-2xl bg-surface border border-border/80 shadow-sm flex items-center gap-3.5 sm:gap-4 h-full min-h-[76px]">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-extrabold text-sm sm:text-base flex-shrink-0 leading-none select-none">
              5
            </div>
            <div className="flex flex-col justify-center min-w-0 flex-1">
              <div className="text-xs sm:text-sm font-bold text-foreground truncate leading-snug">Core Services</div>
              <div className="text-[11px] sm:text-xs text-muted truncate mt-1 leading-none font-medium">End-to-End Execution</div>
            </div>
          </div>
        </motion.div>

        {/* Premium Horizontal Service Cards Stack */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="space-y-8 lg:space-y-10"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={staggerItem}
              className="group rounded-2xl sm:rounded-3xl bg-surface border border-border/80
                         hover:border-primary/50 hover:shadow-[0_20px_40px_-15px_rgba(214,160,23,0.18)]
                         hover:-translate-y-[6px] transition-all duration-300 ease-out
                         overflow-hidden shadow-md"
            >
              <div className="grid lg:grid-cols-12 items-stretch min-h-[300px] lg:min-h-[320px]">
                {/* ── LEFT (40% Desktop): HD Image ────────────────────── */}
                <div className="lg:col-span-5 relative w-full h-64 sm:h-72 lg:h-full min-h-[260px] sm:min-h-[300px] lg:min-h-[340px] overflow-hidden bg-surface-elevated">
                  {serviceBanners[service.id] && (
                    <Image
                      src={serviceBanners[service.id].src}
                      alt={serviceBanners[service.id].alt}
                      fill
                      quality={85}
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  )}
                  {/* Soft gradient overlay for atmospheric depth */}
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* ── RIGHT (60% Desktop): Service Content ────────────── */}
                <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                  <div>
                    {/* Icon + Title Header */}
                    <div className="flex items-center gap-3.5 mb-3.5">
                      <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary/20 group-hover:scale-105 transition-all duration-300">
                        {serviceIcons[service.id]}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-foreground heading-md group-hover:text-primary transition-colors duration-300">
                        {service.title}
                      </h3>
                    </div>

                    {/* Short Description (Max 2 lines) */}
                    <p className="text-muted body-relaxed text-sm sm:text-base line-clamp-2 leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* 3 Feature Chips ONLY (Replacing long bullet lists) */}
                    <div className="flex flex-wrap gap-2.5 sm:gap-3 mb-6 lg:mb-8">
                      {service.items.slice(0, 3).map((item) => (
                        <span
                          key={item.text}
                          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold bg-primary/10 text-primary border border-primary/20 select-none"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                          <span>{item.text}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Button Section */}
                  <div className="pt-4 sm:pt-5 border-t border-border/80 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedService(serviceDetails[service.id] || null)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-btn-text text-sm font-bold
                                 btn-shine hover:bg-primary-dark shadow-sm shadow-primary/20
                                 hover:shadow-[0_8px_25px_-5px_rgba(214,160,23,0.3)]
                                 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer group/btn"
                    >
                      <span>Quick View</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover/btn:translate-x-1" strokeWidth={2.2} aria-hidden="true" />
                    </button>

                    {serviceRoutes[service.id] && (
                      <Link
                        href={serviceRoutes[service.id]}
                        className="text-xs font-bold text-primary hover:text-primary-dark hover:underline inline-flex items-center gap-1 transition-colors"
                      >
                        <span>Full Page</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Clean Bottom CTA Section */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0.3}
          className="mt-14 lg:mt-16 p-8 sm:p-10 rounded-3xl bg-surface border border-border/80 shadow-lg text-center max-w-4xl mx-auto relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-primary to-transparent" />
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 heading-md">
            Need a Custom Construction Solution?
          </h3>
          <p className="text-muted body-relaxed text-sm sm:text-base max-w-xl mx-auto mb-7">
            Whether you need turnkey villa construction, 3D elevation design, GPS land survey, layout planning, or property development — our expert engineering team is ready to assist.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-primary text-btn-text font-bold text-sm
                       btn-shine hover:bg-primary-dark shadow-md shadow-primary/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group"
          >
            <span>Get Free Consultation</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.2} aria-hidden="true" />
          </a>
        </motion.div>
      </div>

      {/* Service Details Modal */}
      <ServiceModal
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        service={selectedService}
        iconSvg={selectedService ? serviceIcons[selectedService.id] : undefined}
        onGetQuote={handleGetQuote}
      />
    </section>
  );
}
