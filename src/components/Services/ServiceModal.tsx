"use client";

import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import type { ServiceDetail } from "@/src/data/content";
import { useMounted } from "@/src/lib/useMounted";

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: ServiceDetail | null;
  iconSvg?: React.ReactNode;
  onGetQuote: () => void;
}

export default function ServiceModal({
  isOpen,
  onClose,
  service,
  iconSvg,
  onGetQuote,
}: ServiceModalProps) {
  const mounted = useMounted();

  /* Close on Escape key */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  if (!mounted || !service) return null;

  return createPortal(
    <AnimatePresence mode="wait">
      {isOpen && (
        /* Backdrop */
        <motion.div
          key="service-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/65 backdrop-blur-md px-4 py-6 sm:px-6"
          onClick={onClose}
          aria-hidden="true"
        >
          {/* Modal Card */}
          <motion.div
            key="service-modal-card"
            initial={{ scale: 0.94, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 12 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={service.title}
            className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-3xl
                       bg-surface border border-border shadow-2xl overflow-hidden"
            style={{
              background: "var(--glass-bg)",
              backdropFilter: "blur(32px) saturate(200%)",
              WebkitBackdropFilter: "blur(32px) saturate(200%)",
            }}
          >
            {/* Top Gold Accent Border */}
            <div className="absolute top-0 left-8 right-8 h-[2.5px] rounded-b-full bg-gradient-to-r from-transparent via-primary to-transparent z-20" />

            {/* Header Bar */}
            <div className="flex items-center justify-between px-6 sm:px-8 pt-7 pb-5 border-b border-border/60 relative z-10 flex-shrink-0">
              <div className="flex items-center gap-4 min-w-0 pr-6">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20
                              flex items-center justify-center text-primary flex-shrink-0">
                  {iconSvg || <span className="text-2xl">{service.icon}</span>}
                </div>
                <div className="min-w-0">
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground truncate heading-md">
                    {service.title}
                  </h3>
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider block mt-0.5">
                    {service.shortIntro}
                  </span>
                </div>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                className="w-10 h-10 rounded-full flex items-center justify-center text-muted
                           hover:text-foreground hover:bg-surface-elevated transition-colors flex-shrink-0"
                aria-label="Close modal"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Scrollable Modal Content */}
            <div className="px-6 sm:px-8 py-6 space-y-7 overflow-y-auto flex-1">
              {/* Detailed Overview */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-2">
                  Overview
                </h4>
                <p className="text-muted body-relaxed text-sm sm:text-base leading-relaxed">
                  {service.fullDescription}
                </p>
              </div>

              {/* Complete List of Services */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
                  Scope of Services Included
                </h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  {service.items.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 p-3 rounded-xl bg-surface-elevated/70 border border-border/50"
                    >
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-foreground">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Benefits */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
                  Key Benefits & Advantages
                </h4>
                <ul className="space-y-2.5">
                  {service.keyBenefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3 text-xs sm:text-sm text-muted">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Why Choose Us */}
              <div className="p-5 rounded-2xl bg-surface-elevated/80 border border-primary/20">
                <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-3 flex items-center gap-2">
                  <span>⭐</span> Why Choose SCE Construction for {service.title}?
                </h4>
                <ul className="space-y-2">
                  {service.whyChooseUs.map((reason) => (
                    <li key={reason} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-primary flex-shrink-0 mt-0.5">
                        <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Actions Footer */}
            <div className="px-6 sm:px-8 py-5 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 bg-surface-elevated/40 flex-shrink-0">
              <span className="text-xs text-muted text-center sm:text-left">
                Ready to begin your project? Get in touch with our team today.
              </span>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 sm:flex-none border border-border text-muted px-5 py-2.5 rounded-xl
                             text-sm font-semibold hover:text-foreground hover:border-foreground/30
                             transition-all duration-300"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={onGetQuote}
                  className="flex-1 sm:flex-none btn-shine bg-primary text-btn-text hover:bg-primary-dark
                             px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300
                             hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap shadow-md"
                >
                  Get Free Quote
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
