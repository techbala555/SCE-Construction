"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { contactDetails, companyInfo } from "@/src/data/content";
import { useScrollAnimation } from "@/src/lib/useScrollAnimation";
import { fadeUp, slideRight, slideLeft } from "@/src/lib/motion";

interface ContactProps {
  id: string;
}

export default function Contact({ id }: ContactProps) {
  const { ref, inView } = useScrollAnimation<HTMLDivElement>({ threshold: 0.08 });
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const contactItems = [
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
        </svg>
      ),
      label: "Visit Us",
      value: contactDetails.address,
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
        </svg>
      ),
      label: "Call Us",
      value: contactDetails.phone,
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
      label: "Email Us",
      value: contactDetails.email,
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      label: "Working Hours",
      value: contactDetails.workingHours,
    },
  ];

  return (
    <section id={id} className="section-padding px-6 md:px-8 lg:px-12 bg-accent dark:bg-[#0C1726] relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/10 to-transparent" />

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
            <span className="label-sm text-primary">Get In Touch</span>
            <div className="divider-gold" />
          </div>
          <h2 className="heading-xl text-3xl sm:text-4xl lg:text-5xl text-foreground mb-6">
            Start Your <span className="text-gold-gradient">Project</span>
          </h2>
          <p className="text-muted body-lg max-w-2xl mx-auto">
            Ready to bring your vision to life? Our team is here to help with every step of the journey
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-20">
          {/* Contact Info */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0.1}
            className="lg:col-span-2"
          >
            <h3 className="text-xl font-semibold text-foreground mb-10 heading-md">{companyInfo.name}</h3>

            <div className="space-y-7">
              {contactItems.map((item) => (
                <div key={item.label} className="flex gap-5 group">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 border border-primary/10
                                flex items-center justify-center text-primary
                                transition-all duration-300 group-hover:bg-primary/20">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1.5">
                      {item.label}
                    </p>
                    <p className="text-muted text-sm body-relaxed">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="mt-12 pt-10 border-t border-border">
              <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-5">Follow Us</p>
              <div className="flex gap-3">
                {Object.entries(contactDetails.socials).map(([name]) => (
                  <div
                    key={name}
                    className="w-11 h-11 rounded-xl bg-surface-elevated dark:bg-surface border border-border
                               flex items-center justify-center text-muted
                               hover:text-primary hover:border-primary/30 transition-all duration-300 cursor-pointer"
                  >
                    <span className="text-xs font-bold uppercase">{name[0]}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0.2}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="p-8 sm:p-10 lg:p-12 rounded-2xl bg-surface dark:bg-surface border border-border shadow-medium">
              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-3">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="John Smith"
                    className="input-premium"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-3">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="input-premium"
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="phone" className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-3">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formState.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className="input-premium"
                />
              </div>

              <div className="mb-8">
                <label htmlFor="message" className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-3">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project..."
                  rows={5}
                  className="input-premium resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full min-h-[56px] py-4 text-sm font-semibold rounded-xl
                           bg-primary text-[#0B1F3A] hover:bg-primary-dark
                           btn-shine transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]
                           shadow-md shadow-primary/20"
              >
                Send Message
              </button>

              <p className="text-center text-xs text-muted mt-5">
                We&apos;ll get back to you within 24 hours
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
