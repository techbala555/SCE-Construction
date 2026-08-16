"use client";

import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  Check,
  AlertCircle,
  PhoneCall,
  MessageSquare,
  ArrowRight,
  Loader2,
  MapPinned,
} from "lucide-react";
import { useScrollAnimation } from "@/src/lib/useScrollAnimation";
import { fadeUp, staggerContainer, staggerItem } from "@/src/lib/motion";
import {
  leadFormSchema,
  projectTypes,
  budgetRanges,
  contactMethods,
  type LeadFormData,
} from "@/src/lib/validations/lead-schema";
import CustomSelect from "./CustomSelect";

const SubmissionModal = dynamic(() => import("./SubmissionModal"), { ssr: false });

interface ContactProps {
  id: string;
}

/* ── Trust stats shown beside the header ─────────────────── */
const trustStats = [
  { value: "10+", label: "Years Experience" },
  { value: "100+", label: "Projects Delivered" },
  { value: "50+", label: "Professional Team" },
];

export default function Contact({ id }: ContactProps) {
  const { ref, inView } = useScrollAnimation<HTMLDivElement>({ threshold: 0.05 });
  const [isPendingSubmit, setIsPendingSubmit] = useState(false);
  const [shouldLoadMap, setShouldLoadMap] = useState(false);
  const [isMapInteractive, setIsMapInteractive] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mapRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadMap(true);
          observer.disconnect();
        }
      },
      { rootMargin: "250px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const [modalState, setModalState] = useState<{
    open: boolean;
    type: "success" | "error";
    title?: string;
    message?: string;
  }>({ open: false, type: "success" });

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

  /* ── Submit lead to /api/leads API (Duplicate Protected) ── */
  const onSubmit = async (data: LeadFormData) => {
    if (isPendingSubmit) return; // Prevent rapid double-clicks
    setIsPendingSubmit(true);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        setModalState({
          open: true,
          type: "success",
        });
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
    } catch (err) {
      console.error("Form submission error:", err);
      setModalState({
        open: true,
        type: "error",
        message: "Network error occurred. Please check your connection and try again.",
      });
      setIsPendingSubmit(false);
    }
  };

  const handleCloseModal = () => {
    if (modalState.type === "success") {
      reset();
    }
    setModalState({ open: false, type: "success" });
    setIsPendingSubmit(false);
  };

  const handleRetry = () => {
    if (modalState.type === "success") {
      reset();
    }
    setModalState({ open: false, type: "success" });
    setIsPendingSubmit(false);
  };

  /* ── Helper for input field status styling ───────────── */
  const getFieldStatusClass = (fieldName: keyof LeadFormData) => {
    const error = errors[fieldName];
    const isTouched = touchedFields[fieldName];
    const val = formValues[fieldName];

    if (error) {
      return "!border-red-500/90 focus:!ring-red-500/20";
    }
    if (isTouched && val && !error) {
      return "!border-emerald-500/80 focus:!ring-emerald-500/20";
    }
    return "";
  };

  return (
    <>
      <section
        id={id}
        className="section-padding px-6 md:px-8 lg:px-12 bg-accent relative overflow-hidden"
      >
        {/* ── Decorative elements ────────────────────────── */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-primary/[0.03] blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-primary/[0.02] blur-3xl pointer-events-none" />

        <div ref={ref} className="max-w-7xl mx-auto relative z-10">
          {/* ── Section header ──────────────────────────── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0}
            className="text-center mb-16 lg:mb-20"
          >
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="divider-gold" />
              <span className="label-sm text-primary">Get In Touch</span>
              <div className="divider-gold" />
            </div>
            <h2 className="heading-xl text-3xl sm:text-4xl lg:text-5xl text-foreground mb-6">
              Start Your <span className="text-gold-gradient">Dream Project</span>
            </h2>
            <p className="text-muted body-lg max-w-2xl mx-auto mb-12">
              Fill out the form below and our team will get back to you within 24 hours to discuss your project requirements.
            </p>

            {/* ── Trust indicators ─────────────────────── */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="flex flex-wrap items-center justify-center gap-8 sm:gap-12"
            >
              {trustStats.map((stat) => (
                <motion.div key={stat.label} variants={staggerItem} className="text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-gold-gradient mb-1">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted uppercase tracking-wider font-medium">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Form & Map Grid (Two-column layout on Desktop) ───── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0.15}
            className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch max-w-7xl mx-auto"
          >
            {/* Left Column: Contact Form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="relative p-5 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl
                         bg-surface/95 backdrop-blur-md border border-border
                         shadow-large h-full flex flex-col justify-between"
            >
              {/* Subtle gold top accent */}
              <div className="absolute top-0 left-6 right-6 sm:left-8 sm:right-8 h-[2px] rounded-b-full bg-gradient-to-r from-transparent via-primary/40 to-transparent pointer-events-none" />

              <div className="space-y-6 sm:space-y-7">
                {/* ── Row 1: Full Name + Phone Number ────── */}
                <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-2.5 sm:mb-3"
                    >
                      Full Name <span className="text-primary">*</span>
                    </label>
                    <div className="relative">
                      <input
                        {...register("name")}
                        type="text"
                        id="name"
                        placeholder="Enter your full name"
                        className={`input-premium transition-all duration-200 ${getFieldStatusClass("name")}`}
                      />
                      {touchedFields.name && formValues.name && !errors.name && (
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-500">
                          <Check className="w-4 h-4" strokeWidth={2.5} aria-hidden="true" />
                        </div>
                      )}
                    </div>
                    {errors.name && (
                      <p className="mt-2 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-2.5 sm:mb-3"
                    >
                      Phone Number <span className="text-primary">*</span>
                    </label>
                    <div className="flex relative">
                      <span className="inline-flex items-center px-3 sm:px-4 rounded-l-xl border border-r-0 border-border bg-surface-elevated text-muted text-xs sm:text-sm font-medium select-none">
                        +91
                      </span>
                      <input
                        {...register("phone")}
                        type="tel"
                        id="phone"
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
                      <p className="mt-2 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* ── Row 2: Email Address + Project Type ── */}
                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Email Address */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-3"
                    >
                      Email Address <span className="text-primary">*</span>
                    </label>
                    <div className="relative">
                      <input
                        {...register("email")}
                        type="email"
                        id="email"
                        inputMode="email"
                        autoComplete="email"
                        autoCapitalize="none"
                        spellCheck="false"
                        placeholder="name@example.com"
                        className={`input-premium transition-all duration-200 ${getFieldStatusClass("email")}`}
                      />
                      {touchedFields.email && formValues.email && !errors.email && (
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-500">
                          <Check className="w-4 h-4" strokeWidth={2.5} aria-hidden="true" />
                        </div>
                      )}
                    </div>
                    {errors.email && (
                      <p className="mt-2 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Project Type Dropdown */}
                  <Controller
                    control={control}
                    name="projectType"
                    render={({ field }) => (
                      <CustomSelect
                        id="projectType"
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

                {/* ── Row 3: Location + Estimated Budget ──── */}
                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Location */}
                  <div>
                    <label
                      htmlFor="location"
                      className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-3"
                    >
                      Location <span className="text-primary">*</span>
                    </label>
                    <div className="relative">
                      <input
                        {...register("location")}
                        type="text"
                        id="location"
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
                      <p className="mt-2 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />
                        {errors.location.message}
                      </p>
                    )}
                  </div>

                  {/* Estimated Budget Dropdown */}
                  <Controller
                    control={control}
                    name="budget"
                    render={({ field }) => (
                      <CustomSelect
                        id="budget"
                        label="Estimated Budget"
                        options={budgetRanges}
                        value={field.value || ""}
                        onChange={field.onChange}
                        placeholder="Select budget range (Optional)"
                        isTouched={touchedFields.budget}
                        isValid={!errors.budget && !!field.value}
                      />
                    )}
                  />
                </div>

                {/* ── Row 4: Preferred Contact Method ──── */}
                <div>
                  <p className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-3">
                    Preferred Contact Method <span className="text-muted text-[10px] normal-case tracking-normal">(optional)</span>
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {contactMethods.map((method) => (
                      <label key={method} className="relative cursor-pointer">
                        <input
                          {...register("preferredContactMethod")}
                          type="radio"
                          value={method}
                          className="peer sr-only"
                        />
                        <span className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium
                                       border border-border text-muted
                                       peer-checked:border-primary peer-checked:text-primary peer-checked:bg-primary/10
                                       hover:border-primary/50 hover:text-foreground
                                       transition-all duration-300 select-none">
                          {method === "Phone Call" && (
                            <PhoneCall className="w-4 h-4 text-primary" strokeWidth={1.8} aria-hidden="true" />
                          )}
                          {method === "WhatsApp" && (
                            <MessageSquare className="w-4 h-4 text-primary" strokeWidth={1.8} aria-hidden="true" />
                          )}
                          {method}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* ── Row 5: Your Message ─────────────────── */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-3 flex items-center justify-between"
                  >
                    <span>
                      Your Message <span className="text-muted text-[10px] normal-case tracking-normal">(optional)</span>
                    </span>
                  </label>
                  <div className="relative">
                    <textarea
                      {...register("message")}
                      id="message"
                      placeholder="Tell us about your project vision, requirements, and timeline..."
                      rows={4}
                      className={`input-premium resize-none transition-all duration-200 ${getFieldStatusClass("message")}`}
                    />
                    {touchedFields.message && formValues.message && !errors.message && (
                      <div className="absolute right-3.5 bottom-3.5 text-emerald-500">
                        <Check className="w-4 h-4" strokeWidth={2.5} aria-hidden="true" />
                      </div>
                    )}
                  </div>
                </div>

                {/* ── Submit button ──────────────────────── */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={!isValid || isSubmitting || isPendingSubmit}
                    className="w-full min-h-[56px] py-4 text-sm font-semibold rounded-xl
                               bg-primary text-btn-text hover:bg-primary-dark
                               btn-shine transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]
                               shadow-md shadow-primary/20
                               disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-none
                               flex items-center justify-center gap-3 group"
                  >
                    {isSubmitting || isPendingSubmit ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" strokeWidth={2} aria-hidden="true" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Get Free Consultation</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.2} aria-hidden="true" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-muted mt-4">
                    By submitting, you agree to receive a callback from our team.
                  </p>
                </div>
              </div>
            </form>

            {/* Right Column: Google Map Embed */}
            <div className="flex flex-col h-full space-y-3">
              <div
                ref={mapRef}
                onClick={() => setIsMapInteractive(true)}
                onMouseLeave={() => setIsMapInteractive(false)}
                className="relative w-full flex-1 min-h-[380px] sm:min-h-[420px] lg:min-h-[460px]
                           rounded-2xl sm:rounded-3xl overflow-hidden
                           bg-surface border border-border
                           shadow-large flex items-center justify-center group cursor-pointer"
              >
                {/* Subtle gold top accent matching the form card */}
                <div className="absolute top-0 left-6 right-6 sm:left-8 sm:right-8 h-[2px] rounded-b-full bg-gradient-to-r from-transparent via-primary/40 to-transparent z-10 pointer-events-none" />

                {/* Click to Interact Overlay Badge (Prevents unintended scroll locking) */}
                {!isMapInteractive && shouldLoadMap && (
                  <div className="absolute top-4 right-4 z-20 pointer-events-none">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white text-xs font-semibold shadow-md">
                      <MapPinned className="w-3.5 h-3.5 text-primary" strokeWidth={2} aria-hidden="true" />
                      Click to interact
                    </span>
                  </div>
                )}

                {shouldLoadMap ? (
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3915.860409729857!2d76.9223518!3d11.0490908!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859728aa80393%3A0x1861b2c7c4c52dce!2sCircuit%20%26%20Engineering%20Electrical%20Work!5e0!3m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    title="Google Maps Location of Shylesh Circuits & Engineering"
                    className={`w-full h-full min-h-[380px] sm:min-h-[420px] lg:min-h-[460px] filter contrast-[1.02] rounded-2xl sm:rounded-3xl transition-all duration-200 ${
                      isMapInteractive ? "pointer-events-auto" : "pointer-events-none"
                    }`}
                  />
                ) : (
                  <div className="text-center p-6">
                    <MapPinned className="w-8 h-8 text-primary mx-auto mb-2 opacity-60 animate-pulse" strokeWidth={1.8} aria-hidden="true" />
                    <p className="text-sm font-medium text-muted">Loading map location...</p>
                  </div>
                )}
              </div>

              {/* Small "Open in Google Maps" Link */}
              <div className="flex items-center justify-end px-2">
                <a
                  href="https://www.google.com/maps/place/Circuit+%26+Engineering+Electrical+Work/@11.0490908,76.9223518,17z/data=!3m1!4b1!4m6!3m5!1s0x3ba859728aa80393:0x1861b2c7c4c52dce!8m2!3d11.0490908!4d76.9223518!16s%2Fg%2F11b8z0k5t_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-primary
                             hover:text-primary-dark transition-all duration-200 group hover:underline cursor-pointer"
                  aria-label="Open Shylesh Circuits & Engineering office location on Google Maps (opens in a new tab)"
                >
                  <MapPinned className="w-4 h-4 text-primary transition-transform duration-200 group-hover:scale-110" strokeWidth={2} aria-hidden="true" />
                  <span>Open in Google Maps</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Modal ──────────────────────────────────────── */}
      <SubmissionModal
        isOpen={modalState.open}
        type={modalState.type}
        customTitle={modalState.title}
        customMessage={modalState.message}
        onClose={handleCloseModal}
        onRetry={handleRetry}
      />
    </>
  );
}
