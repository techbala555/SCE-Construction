"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/src/lib/useScrollAnimation";
import { fadeUp, staggerContainer, staggerItem } from "@/src/lib/motion";
import {
  leadFormSchema,
  projectTypes,
  budgetRanges,
  contactMethods,
  type LeadFormData,
} from "@/src/lib/validations/lead-schema";
import SubmissionModal from "./SubmissionModal";
import CustomSelect from "./CustomSelect";

interface ContactProps {
  id: string;
}

/* ── Trust stats shown beside the header ─────────────────── */
const trustStats = [
  { value: "22+", label: "Years Experience" },
  { value: "500+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
];

export default function Contact({ id }: ContactProps) {
  const { ref, inView } = useScrollAnimation<HTMLDivElement>({ threshold: 0.05 });
  const [modalState, setModalState] = useState<{
    open: boolean;
    type: "success" | "error";
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
      projectType: "",
      budget: "",
      location: "",
      preferredContactMethod: "Phone Call",
      message: "",
    },
  });

  const formValues = watch();

  /* ── Demo submit - no backend, just shows modal ──────── */
  const onSubmit = async (_data: LeadFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setModalState({ open: true, type: "success" });
  };

  const handleCloseModal = () => setModalState({ open: false, type: "success" });
  const handleRetry = () => {
    setModalState({ open: false, type: "success" });
    reset();
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
              Ready to bring your vision to life? Fill out the form below and our
              expert team will get back to you within 24 hours with a free
              consultation.
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

          {/* ── Form card ──────────────────────────────── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0.15}
            className="max-w-4xl mx-auto"
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="relative p-8 sm:p-10 lg:p-14 rounded-3xl
                         bg-surface border border-border
                         shadow-large"
              style={{
                background: "var(--glass-bg)",
                backdropFilter: "blur(24px) saturate(180%)",
                WebkitBackdropFilter: "blur(24px) saturate(180%)",
              }}
            >
              {/* Subtle gold top accent */}
              <div className="absolute top-0 left-8 right-8 h-[2px] rounded-b-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

              <div className="space-y-7">
                {/* ── Row 1: Full Name + Phone Number ────── */}
                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-3"
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
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      )}
                    </div>
                    {errors.name && (
                      <p className="mt-2 text-xs text-red-500 flex items-center gap-1">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/></svg>
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-3"
                    >
                      Phone Number <span className="text-primary">*</span>
                    </label>
                    <div className="flex relative">
                      <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-border bg-surface-elevated text-muted text-sm font-medium select-none">
                        +91
                      </span>
                      <input
                        {...register("phone")}
                        type="tel"
                        id="phone"
                        maxLength={10}
                        placeholder="9876543210"
                        onChange={(e) => {
                          // Allow only numeric digits 0-9 up to 10 digits
                          const clean = e.target.value.replace(/\D/g, "").slice(0, 10);
                          setValue("phone", clean, { shouldValidate: true, shouldTouch: true });
                        }}
                        className={`input-premium !rounded-l-none transition-all duration-200 ${getFieldStatusClass("phone")}`}
                      />
                      {touchedFields.phone && formValues.phone && !errors.phone && (
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-500">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      )}
                    </div>
                    {errors.phone && (
                      <p className="mt-2 text-xs text-red-500 flex items-center gap-1">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/></svg>
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* ── Row 2: Project Type + Location ──────── */}
                <div className="grid sm:grid-cols-2 gap-6">
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
                        placeholder="Madurai, Tamil Nadu"
                        className={`input-premium transition-all duration-200 ${getFieldStatusClass("location")}`}
                      />
                      {touchedFields.location && formValues.location && !errors.location && (
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-500">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      )}
                    </div>
                    {errors.location && (
                      <p className="mt-2 text-xs text-red-500 flex items-center gap-1">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/></svg>
                        {errors.location.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* ── Row 3: Estimated Budget (Optional) ──── */}
                <div className="grid sm:grid-cols-2 gap-6">
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

                  {/* Preferred Contact Method (Phone / WhatsApp) */}
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
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
                            )}
                            {method === "WhatsApp" && (
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                            )}
                            {method}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ── Row 4: Your Message ─────────────────── */}
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
                      rows={5}
                      className={`input-premium resize-none transition-all duration-200 ${getFieldStatusClass("message")}`}
                    />
                    {touchedFields.message && formValues.message && !errors.message && (
                      <div className="absolute right-3.5 bottom-3.5 text-emerald-500">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>

                {/* ── Submit button ──────────────────────── */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={!isValid || isSubmitting}
                    className="w-full min-h-[56px] py-4 text-sm font-semibold rounded-xl
                               bg-primary text-btn-text hover:bg-primary-dark
                               btn-shine transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]
                               shadow-md shadow-primary/20
                               disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-none
                               flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="3"
                            className="opacity-25"
                          />
                          <path
                            d="M4 12a8 8 0 018-8"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            className="opacity-75"
                          />
                        </svg>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Get Free Consultation</span>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-muted mt-5">
                    By submitting, you agree to receive a callback from our team.
                    <br />
                    We respect your privacy and never share your information.
                  </p>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* ── Modal ──────────────────────────────────────── */}
      <SubmissionModal
        isOpen={modalState.open}
        type={modalState.type}
        onClose={handleCloseModal}
        onRetry={handleRetry}
      />
    </>
  );
}
