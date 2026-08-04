"use client";

import { useEffect, useCallback, useRef } from "react";
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

/* ── Section SVG Icons ─────────────────────────────────────── */

function BookOpenIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

function BadgeCheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

/* ── Focus Trap Utility ─────────────────────────────────────── */
function useFocusTrap(isActive: boolean, containerRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusable = container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (focusable.length === 0) {
        e.preventDefault();
        return;
      }
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    container.addEventListener("keydown", handleKeyDown);
    setTimeout(() => first?.focus(), 50);
    return () => container.removeEventListener("keydown", handleKeyDown);
  }, [isActive, containerRef]);
}

export default function ServiceModal({
  isOpen,
  onClose,
  service,
  iconSvg,
  onGetQuote,
}: ServiceModalProps) {
  const mounted = useMounted();
  const modalRef = useRef<HTMLDivElement>(null);

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

  useFocusTrap(isOpen, modalRef);

  if (!mounted || !service) return null;

  return createPortal(
    <AnimatePresence mode="wait">
      {isOpen && (
        /* Backdrop Overlay */
        <motion.div
          key="service-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/65 dark:bg-black/80 backdrop-blur-md p-3 sm:p-6"
          onClick={onClose}
          aria-hidden="true"
        >
          {/* Modal Container */}
          <motion.div
            ref={modalRef}
            key="service-modal-card"
            initial={{ scale: 0.92, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 16 }}
            transition={{ type: "spring", stiffness: 340, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={service.title}
            className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl
                       bg-surface border border-border/80 shadow-2xl overflow-hidden select-none"
          >
            {/* Top Gold Accent Border Line */}
            <div className="absolute top-0 left-8 right-8 h-[3px] rounded-b-full bg-gradient-to-r from-transparent via-primary to-transparent z-30 pointer-events-none" />

            {/* ── Sticky Header Bar ────────────────────────────── */}
            <div className="sticky top-0 z-20 px-6 sm:px-8 py-5 border-b border-border/60 bg-surface/98 backdrop-blur-md flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-4 min-w-0 pr-4">
                {/* Service Icon Badge */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-primary/10 border border-primary/20
                              flex items-center justify-center text-primary shadow-sm flex-shrink-0">
                  {iconSvg || <span className="text-xl sm:text-2xl">{service.icon}</span>}
                </div>

                {/* Title & Category Badge */}
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-0.5">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">
                      Service Showcase
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-2xl font-bold text-foreground truncate heading-md">
                    {service.title}
                  </h3>
                  <p className="text-xs text-muted font-medium truncate hidden sm:block mt-0.5">
                    {service.shortIntro}
                  </p>
                </div>
              </div>

              {/* Modern Circular Close Button */}
              <button
                type="button"
                onClick={onClose}
                className="w-10 h-10 rounded-full border border-border bg-surface-elevated/60 dark:bg-surface-elevated text-muted
                           hover:text-foreground hover:bg-primary/15 hover:border-primary/30
                           transition-all duration-300 active:scale-95 flex items-center justify-center flex-shrink-0"
                aria-label="Close modal"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* ── Scrollable Modal Body Content ────────────────── */}
            <div className="px-6 sm:px-8 py-6 sm:py-8 space-y-10 sm:space-y-12 overflow-y-auto flex-1 custom-scrollbar bg-surface">
              
              {/* 1. Overview Section */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05, duration: 0.35 }}
              >
                <div className="flex items-center gap-3.5 mb-5 sm:mb-6">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary/10 border border-primary/25 flex items-center justify-center text-primary shadow-sm flex-shrink-0">
                    <BookOpenIcon />
                  </div>
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <h4 className="text-base sm:text-lg font-bold text-foreground tracking-tight">
                      Overview & Scope
                    </h4>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary/80 hidden sm:inline-block">
                      01. Details
                    </span>
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-primary/30 via-border/80 to-transparent ml-2" />
                  </div>
                </div>
                <div className="p-6 sm:p-7 rounded-2xl bg-surface dark:bg-surface-elevated/60 border border-border/80 dark:border-border/70 shadow-sm">
                  <p className="text-foreground/90 body-relaxed text-sm sm:text-base leading-relaxed">
                    {service.fullDescription}
                  </p>
                </div>
              </motion.div>

              {/* 2. Scope of Services Included */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.35 }}
              >
                <div className="flex items-center gap-3.5 mb-5 sm:mb-6">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary/10 border border-primary/25 flex items-center justify-center text-primary shadow-sm flex-shrink-0">
                    <BriefcaseIcon />
                  </div>
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <h4 className="text-base sm:text-lg font-bold text-foreground tracking-tight">
                      Scope of Services Included
                    </h4>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary/80 hidden sm:inline-block">
                      02. Features
                    </span>
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-primary/30 via-border/80 to-transparent ml-2" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-3.5 sm:gap-4">
                  {service.items.map((item, idx) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.03 * idx + 0.1, duration: 0.3 }}
                      className="group p-4.5 rounded-2xl bg-surface dark:bg-surface-elevated/70 border border-border/80 dark:border-border/70
                                 hover:border-primary/40 hover:shadow-md transition-all duration-300 card-hover shadow-sm flex items-center gap-4"
                    >
                      <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20
                                    flex items-center justify-center text-primary flex-shrink-0 transition-transform group-hover:scale-110">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-foreground leading-snug">
                        {item}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* 3. Key Benefits & Advantages */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.35 }}
              >
                <div className="flex items-center gap-3.5 mb-5 sm:mb-6">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary/10 border border-primary/25 flex items-center justify-center text-primary shadow-sm flex-shrink-0">
                    <BadgeCheckIcon />
                  </div>
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <h4 className="text-base sm:text-lg font-bold text-foreground tracking-tight">
                      Key Benefits & Advantages
                    </h4>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary/80 hidden sm:inline-block">
                      03. Value
                    </span>
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-primary/30 via-border/80 to-transparent ml-2" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-3.5 sm:gap-4">
                  {service.keyBenefits.map((benefit, idx) => (
                    <motion.div
                      key={benefit}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.03 * idx + 0.15, duration: 0.3 }}
                      className="p-4.5 rounded-2xl bg-surface dark:bg-surface-elevated/60 border border-border/80 dark:border-border/70 shadow-sm flex items-start gap-3.5"
                    >
                      <div className="w-7 h-7 rounded-lg bg-primary/15 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      </div>
                      <span className="text-xs sm:text-sm text-muted leading-relaxed">
                        {benefit}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* 4. Why Choose Us Highlight Glass Card */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.35 }}
                className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-primary/10 via-primary/5 dark:via-surface-elevated/90 to-surface
                           border border-primary/30 shadow-glow relative overflow-hidden"
              >
                <div className="flex items-center gap-3.5 mb-5">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary shadow-sm flex-shrink-0">
                    <ShieldCheckIcon />
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-foreground tracking-tight">
                    Why Choose SCE Construction for {service.title}?
                  </h4>
                </div>

                <ul className="space-y-3.5">
                  {service.whyChooseUs.map((reason) => (
                    <li key={reason} className="flex items-start gap-3 text-xs sm:text-sm text-foreground/90 font-medium">
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

            </div>

            {/* ── Redesigned Sticky Call To Action Footer ──────── */}
            <div className="px-6 sm:px-8 py-5 border-t border-border/80 bg-surface/98 backdrop-blur-lg flex-shrink-0 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <h4 className="text-sm sm:text-base font-bold text-foreground">
                  Ready to start your project?
                </h4>
                <p className="text-xs text-muted mt-0.5">
                  Get in touch with our engineering team for a free consultation.
                </p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 sm:flex-none h-12 px-6 rounded-xl border border-border text-muted
                             text-sm font-semibold hover:text-foreground hover:border-foreground/30
                             transition-all duration-300 active:scale-[0.98]"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={onGetQuote}
                  className="flex-1 sm:flex-none btn-shine bg-primary text-btn-text hover:bg-primary-dark
                             h-12 px-8 rounded-xl text-sm font-bold transition-all duration-300
                             hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                >
                  <span>Get Free Quote</span>
                  <ArrowRightIcon />
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
