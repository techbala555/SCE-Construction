"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Check, AlertCircle, ArrowRight, Loader2, Sparkles } from "lucide-react";
import { leadFormSchema, projectTypes, type LeadFormData } from "@/src/lib/validations/lead-schema";
import CustomSelect from "@/src/components/Contact/CustomSelect";
import SubmissionModal from "@/src/components/Contact/SubmissionModal";
import { useMounted } from "@/src/lib/useMounted";

const POPUP_DISMISSED_KEY = "sce_lead_popup_dismissed";
const POPUP_SUBMITTED_KEY = "sce_lead_popup_submitted";
const TIMEOUT_DELAY = 10000; // 10 seconds
const SCROLL_THRESHOLD_PERCENT = 0.45; // 45% scroll depth

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

export default function LeadPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPendingSubmit, setIsPendingSubmit] = useState(false);
  const [modalState, setModalState] = useState<{
    open: boolean;
    type: "success" | "error";
    title?: string;
    message?: string;
  }>({ open: false, type: "success" });

  const mounted = useMounted();
  const modalContainerRef = useRef<HTMLDivElement>(null);
  const hasTriggeredRef = useRef(false);

  /* ── Form Hook Setup ───────────────────────────────────── */
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors, isValid, isSubmitting, touchedFields },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      projectType: "",
      budget: "",
      location: "",
      preferredContactMethod: "Phone Call",
      message: "",
    },
  });

  const formValues = watch();

  /* ── Close & Dismiss Handlers ──────────────────────────── */
  const handleDismiss = useCallback(() => {
    setIsOpen(false);
    try {
      sessionStorage.setItem(POPUP_DISMISSED_KEY, "true");
    } catch {
      // Storage access disabled
    }
  }, []);

  /* ── 10s Timer & 45% Scroll Trigger Logic ──────────────── */
  useEffect(() => {
    if (!mounted) return;

    try {
      const isDismissed = sessionStorage.getItem(POPUP_DISMISSED_KEY) === "true";
      const isSubmitted = sessionStorage.getItem(POPUP_SUBMITTED_KEY) === "true";
      if (isDismissed || isSubmitted) return;
    } catch {
      // Ignore storage errors
    }

    const triggerPopup = () => {
      if (hasTriggeredRef.current) return;
      hasTriggeredRef.current = true;
      setIsOpen(true);
    };

    // 10 Second Timer
    const timer = setTimeout(triggerPopup, TIMEOUT_DELAY);

    // 45% Scroll Trigger
    const onScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      const scrollPercent = window.scrollY / scrollHeight;
      if (scrollPercent >= SCROLL_THRESHOLD_PERCENT) {
        triggerPopup();
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [mounted]);

  /* ── Body Scroll Locking & Keyboard ESC Listener ────────── */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleDismiss();
    };

    if (isOpen) {
      document.addEventListener("keydown", onKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, handleDismiss]);

  useFocusTrap(isOpen, modalContainerRef);

  /* ── Submit lead to /api/leads API ─────────────────────── */
  const onSubmit = async (data: LeadFormData) => {
    if (isPendingSubmit) return;
    setIsPendingSubmit(true);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        try {
          sessionStorage.setItem(POPUP_SUBMITTED_KEY, "true");
          sessionStorage.setItem(POPUP_DISMISSED_KEY, "true");
        } catch {
          // ignore
        }
        setIsOpen(false);
        setModalState({ open: true, type: "success" });
      } else if (response.status === 409) {
        setModalState({
          open: true,
          type: "error",
          title: "Enquiry Already Submitted",
          message:
            resData.message ||
            "This enquiry has already been submitted. Please wait before trying again.",
        });
        setIsPendingSubmit(false);
      } else {
        setModalState({
          open: true,
          type: "error",
          message: resData.message || "Something went wrong. Please try again.",
        });
        setIsPendingSubmit(false);
      }
    } catch {
      setModalState({
        open: true,
        type: "error",
        message: "Network error occurred. Please check your connection and try again.",
      });
      setIsPendingSubmit(false);
    }
  };

  const handleCloseSuccessModal = () => {
    reset();
    setModalState({ open: false, type: "success" });
    setIsPendingSubmit(false);
  };

  const getFieldStatusClass = (fieldName: keyof LeadFormData) => {
    if (errors[fieldName]) {
      return "!border-red-500/80 focus:!border-red-500 focus:!ring-1 focus:!ring-red-500/30";
    }
    if (touchedFields[fieldName] && formValues[fieldName]) {
      return "!border-emerald-500/70 focus:!border-emerald-500 focus:!ring-1 focus:!ring-emerald-500/30";
    }
    return "";
  };

  if (!mounted) return null;

  return (
    <>
      {createPortal(
        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.div
              key="lead-popup-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
              className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-6 overflow-hidden"
              style={{
                background: "rgba(0, 0, 0, 0.75)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }}
              onClick={(e) => {
                if (e.target === e.currentTarget) handleDismiss();
              }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="lead-popup-heading"
            >
              <motion.div
                ref={modalContainerRef}
                key="lead-popup-card"
                initial={{ opacity: 0, scale: 0.94, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 12 }}
                transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
                className="relative w-[94%] sm:w-full max-w-2xl max-h-[90vh] sm:max-h-[85vh] flex flex-col rounded-2xl sm:rounded-3xl
                           bg-surface border border-border shadow-2xl overflow-hidden"
              >
                {/* Gold Top Accent Line */}
                <div className="absolute top-0 left-6 right-6 sm:left-8 sm:right-8 h-[2.5px] rounded-b-full bg-gradient-to-r from-transparent via-primary to-transparent z-10 pointer-events-none" />

                {/* ── Modal Header (Fixed Top) ─────────────────────── */}
                <div className="p-5 sm:p-7 border-b border-border bg-surface flex items-start justify-between gap-4 flex-shrink-0 relative">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-2.5">
                      <Sparkles className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />
                      <span>Free Consultation</span>
                    </div>
                    <h3 id="lead-popup-heading" className="text-lg sm:text-2xl font-bold text-foreground leading-tight">
                      Get Your Free Construction Consultation
                    </h3>
                    <p className="text-muted text-xs sm:text-sm mt-1.5 leading-relaxed">
                      Planning to build your dream home, villa, land development project, or 3D elevation design? Fill out the form below and our team will contact you shortly.
                    </p>
                  </div>

                  {/* Larger Close Button */}
                  <button
                    type="button"
                    onClick={handleDismiss}
                    className="w-10 h-10 min-w-[40px] flex items-center justify-center rounded-xl bg-surface-elevated text-muted
                               hover:bg-primary/15 hover:text-primary transition-all duration-200 border border-border flex-shrink-0 cursor-pointer"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" strokeWidth={2.2} aria-hidden="true" />
                  </button>
                </div>

                {/* ── Scrollable Form Body ────────────────────────── */}
                <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-4 sm:space-y-5 bg-surface">
                  <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4 sm:space-y-5">
                    {/* Row 1: Name & Phone */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="popup-name" className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-2">
                          Full Name <span className="text-primary font-bold ml-0.5">*</span>
                        </label>
                        <div className="relative">
                          <input
                            {...register("name")}
                            type="text"
                            id="popup-name"
                            placeholder="Enter your name"
                            className={`input-premium transition-all duration-200 ${getFieldStatusClass("name")}`}
                          />
                          {touchedFields.name && formValues.name && !errors.name && (
                            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-500">
                              <Check className="w-4 h-4" strokeWidth={2.5} aria-hidden="true" />
                            </div>
                          )}
                        </div>
                        {errors.name && (
                          <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />
                            {errors.name.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="popup-phone" className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-2">
                          Phone Number <span className="text-primary font-bold ml-0.5">*</span>
                        </label>
                        <div className="flex relative">
                          <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-border bg-surface-elevated text-muted text-xs font-medium select-none">
                            +91
                          </span>
                          <input
                            {...register("phone")}
                            type="tel"
                            id="popup-phone"
                            maxLength={10}
                            placeholder="9876543210"
                            onChange={(e) => {
                              const clean = e.target.value.replace(/\D/g, "").slice(0, 10);
                              setValue("phone", clean, { shouldValidate: true, shouldTouch: true });
                            }}
                            className={`input-premium !rounded-l-none transition-all duration-200 ${getFieldStatusClass("phone")}`}
                          />
                          {touchedFields.phone && formValues.phone && !errors.phone && (
                            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-500">
                              <Check className="w-4 h-4" strokeWidth={2.5} aria-hidden="true" />
                            </div>
                          )}
                        </div>
                        {errors.phone && (
                          <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />
                            {errors.phone.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Row 2: Project Type & Location */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Controller
                        control={control}
                        name="projectType"
                        render={({ field }) => (
                          <CustomSelect
                            id="popup-projectType"
                            label="Project Type"
                            required
                            options={projectTypes}
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Select project type"
                            error={errors.projectType?.message}
                            isTouched={touchedFields.projectType}
                            isValid={!errors.projectType && !!field.value}
                          />
                        )}
                      />

                      <div>
                        <label htmlFor="popup-location" className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-2">
                          Location <span className="text-primary font-bold ml-0.5">*</span>
                        </label>
                        <div className="relative">
                          <input
                            {...register("location")}
                            type="text"
                            id="popup-location"
                            placeholder="Coimbatore, Tamil Nadu"
                            className={`input-premium transition-all duration-200 ${getFieldStatusClass("location")}`}
                          />
                          {touchedFields.location && formValues.location && !errors.location && (
                            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-500">
                              <Check className="w-4 h-4" strokeWidth={2.5} aria-hidden="true" />
                            </div>
                          )}
                        </div>
                        {errors.location && (
                          <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />
                            {errors.location.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Row 3: Your Message */}
                    <div>
                      <label htmlFor="popup-message" className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-2">
                        Your Message <span className="text-muted text-[10px] normal-case tracking-normal">(optional)</span>
                      </label>
                      <textarea
                        {...register("message")}
                        id="popup-message"
                        placeholder="Tell us briefly about your project..."
                        rows={2}
                        className={`input-premium resize-none transition-all duration-200 ${getFieldStatusClass("message")}`}
                      />
                    </div>

                    {/* ── Action Buttons Row ──────────────────────── */}
                    <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                      {/* Primary CTA: Get Free Quote */}
                      <button
                        type="submit"
                        disabled={!isValid || isSubmitting || isPendingSubmit}
                        className="w-full sm:flex-1 min-h-[50px] py-3.5 text-sm font-bold rounded-xl
                                   bg-primary text-btn-text hover:bg-primary-dark
                                   btn-shine transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]
                                   shadow-md shadow-primary/20
                                   disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-none
                                   flex items-center justify-center gap-2.5 group cursor-pointer"
                      >
                        {isSubmitting || isPendingSubmit ? (
                          <>
                            <Loader2 className="w-4.5 h-4.5 animate-spin" strokeWidth={2} aria-hidden="true" />
                            <span>Submitting...</span>
                          </>
                        ) : (
                          <>
                            <span>Get Free Quote</span>
                            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.2} aria-hidden="true" />
                          </>
                        )}
                      </button>

                      {/* Secondary CTA: Continue Browsing */}
                      <button
                        type="button"
                        onClick={handleDismiss}
                        className="w-full sm:flex-1 min-h-[50px] py-3.5 text-sm font-semibold rounded-xl
                                   border border-border bg-surface-elevated text-foreground
                                   hover:bg-surface-elevated/80
                                   transition-all duration-200 cursor-pointer"
                      >
                        Continue Browsing
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* Confirmation Modal */}
      <SubmissionModal
        isOpen={modalState.open}
        type={modalState.type}
        customTitle={modalState.title}
        customMessage={modalState.message}
        onClose={handleCloseSuccessModal}
        onRetry={handleCloseSuccessModal}
      />
    </>
  );
}
