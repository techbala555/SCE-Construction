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

interface PopupDialogProps {
  onDismiss: () => void;
  onSuccess: () => void;
  onError: (msg?: string) => void;
  onAlreadySubmitted: (msg?: string) => void;
}

function PopupDialog({ onDismiss, onSuccess, onError, onAlreadySubmitted }: PopupDialogProps) {
  const modalContainerRef = useRef<HTMLDivElement>(null);
  const [isPendingSubmit, setIsPendingSubmit] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
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
  useFocusTrap(true, modalContainerRef);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismiss();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onDismiss]);

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
        onSuccess();
      } else if (response.status === 409) {
        onAlreadySubmitted(resData.message);
        setIsPendingSubmit(false);
      } else {
        onError(resData.message);
        setIsPendingSubmit(false);
      }
    } catch {
      onError("Network error occurred. Please check your connection and try again.");
      setIsPendingSubmit(false);
    }
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

  return (
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
                if (e.target === e.currentTarget) onDismiss();
              }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="lead-popup-heading"
            >
              <motion.div
                ref={modalContainerRef}
                key="lead-popup-card"
                initial={{ opacity: 0, scale: 0.95, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 12 }}
                transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                className="relative w-full max-w-2xl max-h-[92vh] sm:max-h-[88vh] flex flex-col rounded-2xl sm:rounded-3xl
                           bg-surface border border-border shadow-2xl overflow-hidden"
              >
                {/* Gold Top Accent Line */}
                <div className="absolute top-0 left-6 right-6 sm:left-8 sm:right-8 h-[2.5px] rounded-b-full bg-gradient-to-r from-transparent via-primary to-transparent z-10 pointer-events-none" />

                {/* ── Modal Header (Fixed Top) ─────────────────────── */}
                <div className="p-4 sm:p-6 sm:pb-5 border-b border-border bg-surface flex items-start justify-between gap-3 sm:gap-4 flex-shrink-0 relative">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] sm:text-xs font-semibold mb-1.5 sm:mb-2">
                      <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" strokeWidth={2} aria-hidden="true" />
                      <span>Free Consultation</span>
                    </div>
                    <h3 id="lead-popup-heading" className="text-base sm:text-xl md:text-2xl font-bold text-foreground leading-tight">
                      Get Your Free Construction Consultation
                    </h3>
                    <p className="text-muted text-[11px] sm:text-xs md:text-sm mt-1 sm:mt-1.5 leading-normal sm:leading-relaxed">
                      Planning to build your dream home, villa, land layout, or 3D elevation design? Fill out the form and our engineers will reach out.
                    </p>
                  </div>

                  {/* Close Button */}
                  <button
                    type="button"
                    onClick={onDismiss}
                    className="w-9 h-9 sm:w-10 sm:h-10 min-w-[36px] sm:min-w-[40px] flex items-center justify-center rounded-xl bg-surface-elevated text-muted
                               hover:bg-primary/15 hover:text-primary transition-all duration-200 border border-border flex-shrink-0 cursor-pointer"
                    aria-label="Close modal"
                  >
                    <X className="w-4.5 h-4.5 sm:w-5 sm:h-5" strokeWidth={2.2} aria-hidden="true" />
                  </button>
                </div>

                {/* ── Scrollable Form Body ────────────────────────── */}
                <div className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6 sm:pt-5 bg-surface">
                  <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-3 sm:space-y-4">
                    {/* Row 1 (Desktop: Full Name & Phone Number | Mobile: Stacked) */}
                    <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label htmlFor="popup-name" className="block text-[11px] sm:text-xs font-semibold text-foreground uppercase tracking-wider mb-1 sm:mb-1.5">
                          Full Name <span className="text-primary font-bold ml-0.5">*</span>
                        </label>
                        <div className="relative">
                          <input
                            {...register("name")}
                            type="text"
                            id="popup-name"
                            autoComplete="name"
                            placeholder="Enter your name"
                            className={`input-premium py-2 sm:py-2.5 px-3 sm:px-4 text-xs sm:text-sm transition-all duration-200 ${getFieldStatusClass("name")}`}
                          />
                          {touchedFields.name && formValues.name && !errors.name && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500">
                              <Check className="w-4 h-4" strokeWidth={2.5} aria-hidden="true" />
                            </div>
                          )}
                        </div>
                        {errors.name && (
                          <p className="mt-1 text-[11px] sm:text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 flex-shrink-0" strokeWidth={2} aria-hidden="true" />
                            <span>{errors.name.message}</span>
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="popup-phone" className="block text-[11px] sm:text-xs font-semibold text-foreground uppercase tracking-wider mb-1 sm:mb-1.5">
                          Phone Number <span className="text-primary font-bold ml-0.5">*</span>
                        </label>
                        <div className="flex relative">
                          <span className="inline-flex items-center px-2.5 sm:px-3 rounded-l-xl border border-r-0 border-border bg-surface-elevated text-muted text-xs font-medium select-none">
                            +91
                          </span>
                          <input
                            {...register("phone")}
                            type="tel"
                            id="popup-phone"
                            inputMode="numeric"
                            autoComplete="tel-national"
                            maxLength={10}
                            placeholder="9876543210"
                            onChange={(e) => {
                              const clean = e.target.value.replace(/\D/g, "").slice(0, 10);
                              setValue("phone", clean, { shouldValidate: true, shouldTouch: true });
                            }}
                            className={`input-premium !rounded-l-none py-2 sm:py-2.5 px-3 sm:px-4 text-xs sm:text-sm transition-all duration-200 ${getFieldStatusClass("phone")}`}
                          />
                          {touchedFields.phone && formValues.phone && !errors.phone && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500">
                              <Check className="w-4 h-4" strokeWidth={2.5} aria-hidden="true" />
                            </div>
                          )}
                        </div>
                        {errors.phone && (
                          <p className="mt-1 text-[11px] sm:text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 flex-shrink-0" strokeWidth={2} aria-hidden="true" />
                            <span>{errors.phone.message}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Row 2 (Desktop: Email Address & Project Type | Mobile: Stacked) */}
                    <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label htmlFor="popup-email" className="block text-[11px] sm:text-xs font-semibold text-foreground uppercase tracking-wider mb-1 sm:mb-1.5">
                          Email Address <span className="text-primary font-bold ml-0.5">*</span>
                        </label>
                        <div className="relative">
                          <input
                            {...register("email")}
                            type="email"
                            id="popup-email"
                            inputMode="email"
                            autoComplete="email"
                            autoCapitalize="none"
                            spellCheck="false"
                            placeholder="name@example.com"
                            className={`input-premium py-2 sm:py-2.5 px-3 sm:px-4 text-xs sm:text-sm transition-all duration-200 ${getFieldStatusClass("email")}`}
                          />
                          {touchedFields.email && formValues.email && !errors.email && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500">
                              <Check className="w-4 h-4" strokeWidth={2.5} aria-hidden="true" />
                            </div>
                          )}
                        </div>
                        {errors.email && (
                          <p className="mt-1 text-[11px] sm:text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 flex-shrink-0" strokeWidth={2} aria-hidden="true" />
                            <span>{errors.email.message}</span>
                          </p>
                        )}
                      </div>

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
                    </div>

                    {/* Row 3: Location */}
                    <div>
                      <label htmlFor="popup-location" className="block text-[11px] sm:text-xs font-semibold text-foreground uppercase tracking-wider mb-1 sm:mb-1.5">
                        Location <span className="text-primary font-bold ml-0.5">*</span>
                      </label>
                      <div className="relative">
                        <input
                          {...register("location")}
                          type="text"
                          id="popup-location"
                          autoComplete="address-level2"
                          placeholder="Coimbatore, Tamil Nadu"
                          className={`input-premium py-2 sm:py-2.5 px-3 sm:px-4 text-xs sm:text-sm transition-all duration-200 ${getFieldStatusClass("location")}`}
                        />
                        {touchedFields.location && formValues.location && !errors.location && (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500">
                            <Check className="w-4 h-4" strokeWidth={2.5} aria-hidden="true" />
                          </div>
                        )}
                      </div>
                      {errors.location && (
                        <p className="mt-1 text-[11px] sm:text-xs text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 flex-shrink-0" strokeWidth={2} aria-hidden="true" />
                          <span>{errors.location.message}</span>
                        </p>
                      )}
                    </div>

                    {/* Row 4: Your Message */}
                    <div>
                      <label htmlFor="popup-message" className="block text-[11px] sm:text-xs font-semibold text-foreground uppercase tracking-wider mb-1 sm:mb-1.5">
                        Your Message <span className="text-muted text-[10px] normal-case tracking-normal">(optional)</span>
                      </label>
                      <textarea
                        {...register("message")}
                        id="popup-message"
                        placeholder="Tell us briefly about your project requirements..."
                        rows={2}
                        className={`input-premium py-2 sm:py-2.5 px-3 sm:px-4 text-xs sm:text-sm resize-none transition-all duration-200 ${getFieldStatusClass("message")}`}
                      />
                    </div>

                    {/* ── Action Buttons Row ──────────────────────── */}
                    <div className="pt-1.5 sm:pt-2 flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3">
                      {/* Primary CTA: Get Free Quote */}
                      <button
                        type="submit"
                        disabled={!isValid || isSubmitting || isPendingSubmit}
                        className="w-full sm:flex-1 min-h-[46px] sm:min-h-[48px] py-2.5 sm:py-3 text-xs sm:text-sm font-bold rounded-xl
                                   bg-primary text-btn-text hover:bg-primary-dark
                                   btn-shine transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]
                                   shadow-md shadow-primary/20
                                   disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-none
                                   flex items-center justify-center gap-2 group cursor-pointer"
                      >
                        {isSubmitting || isPendingSubmit ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2} aria-hidden="true" />
                            <span>Submitting...</span>
                          </>
                        ) : (
                          <>
                            <span>Get Free Quote</span>
                            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.2} aria-hidden="true" />
                          </>
                        )}
                      </button>

                      {/* Secondary CTA: Continue Browsing */}
                      <button
                        type="button"
                        onClick={onDismiss}
                        className="w-full sm:flex-1 min-h-[46px] sm:min-h-[48px] py-2.5 sm:py-3 text-xs sm:text-sm font-semibold rounded-xl
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
  );
}

/* ── Main LeadPopup Controller (Zero hydration overhead until triggered) ── */
export default function LeadPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalState, setModalState] = useState<{
    open: boolean;
    type: "success" | "error";
    title?: string;
    message?: string;
  }>({ open: false, type: "success" });

  const mounted = useMounted();
  const hasTriggeredRef = useRef(false);

  const handleDismiss = useCallback(() => {
    setIsOpen(false);
    try {
      sessionStorage.setItem(POPUP_DISMISSED_KEY, "true");
    } catch {
      // storage disabled
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    try {
      const isDismissed = sessionStorage.getItem(POPUP_DISMISSED_KEY) === "true";
      const isSubmitted = sessionStorage.getItem(POPUP_SUBMITTED_KEY) === "true";
      if (isDismissed || isSubmitted) return;
    } catch {
      // ignore
    }

    const triggerPopup = () => {
      if (hasTriggeredRef.current) return;
      hasTriggeredRef.current = true;
      setIsOpen(true);
    };

    const timer = setTimeout(triggerPopup, TIMEOUT_DELAY);

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

  const handleSuccess = () => {
    try {
      sessionStorage.setItem(POPUP_SUBMITTED_KEY, "true");
      sessionStorage.setItem(POPUP_DISMISSED_KEY, "true");
    } catch {
      // ignore
    }
    setIsOpen(false);
    setModalState({ open: true, type: "success" });
  };

  const handleError = (msg?: string) => {
    setModalState({
      open: true,
      type: "error",
      message: msg || "Something went wrong. Please try again.",
    });
  };

  const handleAlreadySubmitted = (msg?: string) => {
    setModalState({
      open: true,
      type: "error",
      title: "Enquiry Already Submitted",
      message: msg || "This enquiry has already been submitted. Please wait before trying again.",
    });
  };

  const handleCloseModal = () => {
    setModalState({ open: false, type: "success" });
  };

  if (!mounted) return null;

  return (
    <>
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence mode="wait">
            {isOpen && (
              <PopupDialog
                onDismiss={handleDismiss}
                onSuccess={handleSuccess}
                onError={handleError}
                onAlreadySubmitted={handleAlreadySubmitted}
              />
            )}
          </AnimatePresence>,
          document.body
        )}

      {modalState.open && (
        <SubmissionModal
          isOpen={modalState.open}
          type={modalState.type}
          customTitle={modalState.title}
          customMessage={modalState.message}
          onClose={handleCloseModal}
          onRetry={handleCloseModal}
        />
      )}
    </>
  );
}
