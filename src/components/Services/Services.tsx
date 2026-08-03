"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { services, serviceDetails, type ServiceDetail } from "@/src/data/content";
import { useScrollAnimation } from "@/src/lib/useScrollAnimation";
import { fadeUp, staggerContainer, staggerItem } from "@/src/lib/motion";
import ServiceModal from "./ServiceModal";

// Service-specific SVG icons
const serviceIcons: Record<string, React.ReactNode> = {
  construction: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  "land-development": (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 20h20" /><path d="M5 20V8l4 4V8l4 4V4l4 4v12" /><path d="M19 20V10l-2-2" />
    </svg>
  ),
  "real-estate": (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="1" />
      <path d="M9 22V6h6v16" /><path d="M8 6h8" /><path d="M8 10h2" /><path d="M14 10h2" /><path d="M8 14h2" /><path d="M14 14h2" />
    </svg>
  ),
  "future-projects": (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 22c1-6 5.5-12 16-12" /><path d="M18 10c0-8-12-6-12 0s12 8 12 0z" />
    </svg>
  ),
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
            Our Professional <span className="text-gold-gradient">Services</span>
          </h2>
          <p className="text-muted body-lg max-w-2xl mx-auto">
            Complete construction, land development - delivered with precision, quality materials, and professional project management
          </p>
        </motion.div>

        {/* Services Grid - 2x2 on desktop */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={staggerItem}
              className="group p-8 lg:p-10 rounded-2xl
                         bg-surface border border-border
                         card-hover cursor-default"
            >
              {/* Icon + Title Row */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/10
                              flex items-center justify-center text-primary flex-shrink-0
                              transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-105">
                  {serviceIcons[service.id] || <span className="text-2xl">{service.icon}</span>}
                </div>
                <div className="flex-1 min-w-0 flex items-center justify-center text-center px-2">
                  <h3 className="text-xl font-semibold text-foreground heading-md">
                    {service.title}
                  </h3>
                </div>
                <div className="w-14 flex-shrink-0 pointer-events-none" aria-hidden="true" />
              </div>

              <p className="text-muted body-relaxed text-[0.9375rem] leading-relaxed mb-7">
                {service.description}
              </p>

              {/* Sub-items list */}
              <ul className="space-y-3 mb-7">
                {service.items.map((item) => (
                  <li key={item.text} className="flex items-center gap-3 text-sm text-muted">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-primary flex-shrink-0">
                      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>

              {/* Learn More Action Button */}
              <div className="pt-6 border-t border-border">
                <button
                  type="button"
                  onClick={() => setSelectedService(serviceDetails[service.id] || null)}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary
                             hover:text-primary-dark transition-all duration-300 group-hover:gap-2.5 cursor-pointer"
                >
                  Learn More
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
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
