"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  Check,
  AlertCircle,
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  ArrowRight,
  Loader2,
  MapPinned,
  Clock3,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { useScrollAnimation } from "@/src/lib/useScrollAnimation";
import { fadeUp } from "@/src/lib/motion";
import {
  leadFormSchema,
  projectTypes,
  type LeadFormData,
} from "@/src/lib/validations/lead-schema";
import { contactDetails } from "@/src/data/content";
import CustomSelect from "./CustomSelect";

const SubmissionModal = dynamic(() => import("./SubmissionModal"), { ssr: false });

interface ContactProps {
  id: string;
}

export default function Contact({ id }: ContactProps) {
  const { ref, inView } = useScrollAnimation<HTMLDivElement>({ threshold: 0.05 });
  const [isPendingSubmit, setIsPendingSubmit] = useState(false);
  const [showInteractiveMap, setShowInteractiveMap] = useState(false);

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
      location: "",
      message: "",
    },
  });

  const formValues = watch();

  /* ── Submit lead to /api/leads API (Duplicate Protected) ── */
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
        className="section-padding px-6 md:px-8 lg:px-12 bg-background relative overflow-hidden text-foreground"
      >
        {/* Subtle decorative background gradient */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-primary/[0.03] blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-primary/[0.02] blur-3xl pointer-events-none" />

        <div ref={ref} className="max-w-7xl mx-auto relative z-10">
          {/* ── Section Header ──────────────────────────── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0}
            className="text-center mb-12 sm:mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="divider-gold" />
              <span className="label-sm text-primary">Get In Touch</span>
              <div className="divider-gold" />
            </div>

            <h2 className="heading-xl text-3xl sm:text-4xl lg:text-[2.75rem] text-foreground font-extrabold mb-4 leading-tight">
              Start Your <span className="text-gold-gradient">Dream Project</span>
            </h2>

            <p className="text-muted body-lg max-w-xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed">
              Tell us what you&apos;re planning and our engineering team will help you take the next step with clear guidance and honest estimates.
            </p>
          </motion.div>

          {/* ── Asymmetric Layout (Form ~62% on Left, Contact Card ~38% on Right) ── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0.15}
            className="grid lg:grid-cols-[1.25fr_0.85fr] gap-8 lg:gap-10 xl:gap-12 items-start max-w-7xl mx-auto"
          >
            {/* ── LEFT COLUMN: Streamlined Project Form (~62%) ── */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="relative p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl
                         bg-surface-elevated border border-border
                         shadow-large flex flex-col justify-between"
            >
              {/* Subtle gold top accent */}
              <div className="absolute top-0 left-6 right-6 sm:left-8 sm:right-8 h-[2px] rounded-b-full bg-gradient-to-r from-transparent via-primary/40 to-transparent pointer-events-none" />

              <div className="space-y-5 sm:space-y-6">
                {/* Form Section Heading */}
                <div className="flex items-center justify-between border-b border-border/80 pb-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-foreground">
                      Project Consultation Form
                    </h3>
                    <p className="text-xs text-muted mt-0.5">
                      Fill in your details for a direct callback and project estimate.
                    </p>
                  </div>
                  <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" /> Free Estimate
                  </span>
                </div>

                {/* ── Row 1: Full Name + Phone Number ────── */}
                <div className="grid sm:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-2"
                    >
                      Full Name <span className="text-primary font-bold">*</span>
                    </label>
                    <div className="relative">
                      <input
                        {...register("name")}
                        type="text"
                        id="name"
                        placeholder="e.g. Ramesh Kumar"
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

                  {/* Phone Number */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-2"
                    >
                      Phone Number <span className="text-primary font-bold">*</span>
                    </label>
                    <div className="flex relative">
                      <span className="inline-flex items-center px-3.5 rounded-l-xl border border-r-0 border-border bg-surface text-muted text-xs sm:text-sm font-semibold select-none">
                        +91
                      </span>
                      <input
                        {...register("phone")}
                        type="tel"
                        id="phone"
                        maxLength={10}
                        placeholder="98422 29272"
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

                {/* ── Row 2: Email Address + Project Type ── */}
                <div className="grid sm:grid-cols-2 gap-5">
                  {/* Email Address */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-2"
                    >
                      Email Address <span className="text-primary font-bold">*</span>
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
                      <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Project Type Select */}
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
                        placeholder="Select project category"
                        error={errors.projectType?.message}
                        isTouched={touchedFields.projectType}
                        isValid={!errors.projectType && !!field.value}
                      />
                    )}
                  />
                </div>

                {/* ── Row 3: Location ──────────────────────── */}
                <div>
                  <label
                    htmlFor="location"
                    className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-2"
                  >
                    Project Location / City <span className="text-primary font-bold">*</span>
                  </label>
                  <div className="relative">
                    <input
                      {...register("location")}
                      type="text"
                      id="location"
                      placeholder="e.g. Coimbatore / Pollachi / Madurai / Dindigul"
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

                {/* ── Row 4: Message / Requirements ────────── */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-2 flex items-center justify-between"
                  >
                    <span>
                      Project Details <span className="text-muted text-[10px] normal-case tracking-normal">(optional)</span>
                    </span>
                  </label>
                  <div className="relative">
                    <textarea
                      {...register("message")}
                      id="message"
                      placeholder="Tell us briefly about your plot size, floor requirements, or timeline..."
                      rows={3}
                      className={`input-premium resize-none transition-all duration-200 ${getFieldStatusClass("message")}`}
                    />
                    {touchedFields.message && formValues.message && !errors.message && (
                      <div className="absolute right-3.5 bottom-3.5 text-emerald-500">
                        <Check className="w-4 h-4" strokeWidth={2.5} aria-hidden="true" />
                      </div>
                    )}
                  </div>
                </div>

                {/* ── Submit CTA ───────────────────────────── */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={!isValid || isSubmitting || isPendingSubmit}
                    className="w-full min-h-[54px] py-3.5 px-6 text-sm sm:text-base font-bold rounded-xl
                               bg-primary text-btn-text hover:bg-primary-dark
                               btn-shine transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]
                               shadow-md shadow-primary/20
                               disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-none
                               flex items-center justify-center gap-2.5 group cursor-pointer"
                  >
                    {isSubmitting || isPendingSubmit ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" strokeWidth={2} aria-hidden="true" />
                        <span>Sending Request...</span>
                      </>
                    ) : (
                      <>
                        <span>Get Free Consultation</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.2} aria-hidden="true" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-[11px] sm:text-xs text-muted mt-3">
                    🔒 Your information is confidential. We will connect with you within 24 hours.
                  </p>
                </div>
              </div>
            </form>

            {/* ── RIGHT COLUMN: Contact Channels & Performance Map Preview (~38%) ── */}
            <div className="space-y-6 flex flex-col justify-between h-full">
              {/* Contact Information Card */}
              <div
                className="relative p-6 sm:p-7 rounded-2xl sm:rounded-3xl
                           bg-surface-elevated border border-border shadow-large"
              >
                {/* Gold Top Accent */}
                <div className="absolute top-0 left-6 right-6 h-[2px] rounded-b-full bg-gradient-to-r from-transparent via-primary/40 to-transparent pointer-events-none" />

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-4">
                  <Phone className="w-3.5 h-3.5" strokeWidth={2} />
                  <span>Direct Connect</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                  Let&apos;s Talk About Your Project
                </h3>

                <p className="text-muted text-xs sm:text-sm leading-relaxed mb-6">
                  Have an independent house, villa, layout, or renovation project in mind? Reach out to our engineering team directly:
                </p>

                {/* Direct Action Links */}
                <div className="space-y-3">
                  {/* Phone Call */}
                  <a
                    href={`tel:${contactDetails.phone.replace(/\s+/g, "")}`}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-surface border border-border/80
                               hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary flex-shrink-0 group-hover:scale-105 transition-transform">
                        <Phone className="w-4 h-4" strokeWidth={2} />
                      </div>
                      <div className="truncate">
                        <p className="text-[11px] font-medium text-muted">Phone Enquiries</p>
                        <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                          {contactDetails.phone}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-primary flex-shrink-0 group-hover:translate-x-0.5 transition-transform">
                      Call Now →
                    </span>
                  </a>

                  {/* WhatsApp Chat */}
                  <a
                    href={`https://wa.me/919842229272?text=${encodeURIComponent(
                      "Hello SCE Developers, I would like to discuss a construction project."
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-xl bg-[#ECFDF5] dark:bg-[#062419] border border-emerald-300 dark:border-emerald-800
                               hover:border-emerald-500 hover:bg-[#D1FAE5] dark:hover:bg-[#0B3828] transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-[#0E3D2C] border border-emerald-300 dark:border-emerald-700 flex items-center justify-center text-[#064E3B] dark:text-[#6EE7B7] flex-shrink-0 group-hover:scale-105 transition-transform">
                        <MessageSquare className="w-4 h-4 text-[#064E3B] dark:text-[#6EE7B7]" strokeWidth={2} />
                      </div>
                      <div className="truncate">
                        <p className="text-[11px] font-bold text-[#064E3B] dark:text-[#6EE7B7]">Quick Chat</p>
                        <p className="text-sm font-bold text-slate-900 dark:text-emerald-50 group-hover:text-[#064E3B] dark:group-hover:text-[#6EE7B7] transition-colors">
                          WhatsApp Message
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#064E3B] dark:text-[#6EE7B7] flex-shrink-0 group-hover:translate-x-0.5 transition-transform">
                      Chat →
                    </span>
                  </a>

                  {/* Email */}
                  <a
                    href={`mailto:${contactDetails.email}`}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-surface border border-border/80
                               hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary flex-shrink-0 group-hover:scale-105 transition-transform">
                        <Mail className="w-4 h-4" strokeWidth={2} />
                      </div>
                      <div className="truncate">
                        <p className="text-[11px] font-medium text-muted">Email Enquiries</p>
                        <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                          {contactDetails.email}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-primary flex-shrink-0 group-hover:translate-x-0.5 transition-transform">
                      Email →
                    </span>
                  </a>
                </div>

                {/* Working Hours Strip */}
                <div className="mt-4 pt-4 border-t border-border/60 flex items-center gap-2.5 text-xs text-muted">
                  <Clock3 className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  <span>Working Hours: {contactDetails.workingHours}</span>
                </div>
              </div>

              {/* Performance-First Location Preview Card */}
              <div
                className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl
                           bg-surface-elevated border border-border shadow-large flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                      <MapPin className="w-4 h-4" strokeWidth={2} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground">
                        Office Location
                      </h4>
                      <p className="text-xs text-muted leading-relaxed mt-0.5">
                        {contactDetails.fullAddress}
                      </p>
                    </div>
                  </div>

                  {/* Interactive Map on Click or Lightweight Stylized Preview */}
                  {showInteractiveMap ? (
                    <div className="relative w-full h-44 rounded-xl overflow-hidden border border-border mt-3 mb-3">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3915.860409729857!2d76.9223518!3d11.0490908!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859728aa80393%3A0x1861b2c7c4c52dce!2sCircuit%20%26%20Engineering%20Electrical%20Work!5e0!3m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="strict-origin-when-cross-origin"
                        title="Google Maps Location of Shylesh Circuits & Engineering"
                        className="w-full h-full filter contrast-[1.02]"
                      />
                    </div>
                  ) : (
                    <div
                      onClick={() => setShowInteractiveMap(true)}
                      className="relative w-full h-28 rounded-xl bg-surface border border-border/90
                                 hover:border-primary/40 flex items-center justify-center gap-2 cursor-pointer
                                 transition-all duration-200 mt-3 mb-3 group overflow-hidden"
                    >
                      {/* Grid Pattern in Map Preview Container */}
                      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
                      <div className="relative z-10 text-center px-4">
                        <MapPinned className="w-5 h-5 text-primary mx-auto mb-1 group-hover:scale-110 transition-transform" />
                        <p className="text-xs font-semibold text-foreground">
                          Click to Load Interactive Map
                        </p>
                        <p className="text-[10px] text-muted">
                          TVS Nagar, Coimbatore • Tamil Nadu
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Open in Google Maps External Action Button */}
                <a
                  href={contactDetails.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-surface hover:bg-primary/10 border border-border
                             hover:border-primary/40 text-foreground hover:text-primary text-xs font-bold
                             flex items-center justify-center gap-2 transition-all duration-200 shadow-sm"
                  aria-label="Open in Google Maps (opens in new tab)"
                >
                  <MapPinned className="w-3.5 h-3.5 text-primary" strokeWidth={2} />
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3 text-muted" />
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
