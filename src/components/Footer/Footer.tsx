"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { companyInfo, navigationItems, contactDetails, services } from "@/src/data/content";
import { useScrollAnimation } from "@/src/lib/useScrollAnimation";
import { fadeUp, staggerContainer, staggerItem } from "@/src/lib/motion";
import { scrollToSection } from "@/src/lib/scrollToSection";

export default function Footer() {
  const { ref, inView } = useScrollAnimation<HTMLElement>({ threshold: 0.1 });

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollToSection(href);
  };

  return (
    <footer
      ref={ref}
      className="bg-footer-bg text-deep-text relative overflow-hidden"
    >
      {/* Top Gold Line */}
      <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 pt-16 lg:pt-[120px] pb-10 lg:pb-[60px]">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16"
        >
          {/* Brand Column */}
          <motion.div variants={staggerItem} className="sm:col-span-2 lg:col-span-1">
            {/* Official Logo - footer is always dark, use light logo */}
            <div className="mb-10">
              <Image
                src="/logo-light.svg"
                alt="Shylesh Circuits & Engineering Builders & Developers"
                width={804}
                height={572}
                className="w-auto max-w-none h-20 sm:h-[100px] lg:h-[120px] object-contain"
              />
            </div>
            <p className="text-deep-muted text-sm body-relaxed max-w-xs">
              {companyInfo.tagline}. Complete construction, land development, and real estate solutions built on trust and quality.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={staggerItem}>
            <h4 className="text-sm font-semibold text-primary uppercase tracking-wider mb-7">
              Quick Links
            </h4>
            <ul className="space-y-4">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => scrollTo(e, item.href)}
                    className="text-deep-muted hover:text-primary text-sm transition-colors duration-300
                               inline-flex items-center gap-1.5 group"
                  >
                    <span className="w-0 group-hover:w-2 h-[1px] bg-primary transition-all duration-300" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={staggerItem}>
            <h4 className="text-sm font-semibold text-primary uppercase tracking-wider mb-7">
              Services
            </h4>
            <ul className="space-y-4">
              {services.slice(0, 5).map((service) => (
                <li key={service.id}>
                  <span className="text-deep-muted text-sm cursor-default">
                    {service.title}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={staggerItem}>
            <h4 className="text-sm font-semibold text-primary uppercase tracking-wider mb-7">
              Contact Info
            </h4>
            <div className="space-y-5 text-deep-muted text-sm">
              <div className="flex gap-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary flex-shrink-0 mt-0.5">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
                <span>{contactDetails.address}</span>
              </div>
              <div className="flex gap-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary flex-shrink-0 mt-0.5">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.13.98.37 1.93.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.88.33 1.83.57 2.81.7A2 2 0 0122 16.92z" />
                </svg>
                <span>{contactDetails.phone}</span>
              </div>
              <div className="flex gap-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary flex-shrink-0 mt-0.5">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span>{contactDetails.email}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0.3}
          className="mt-16 lg:mt-20 pt-8 border-t border-deep-border flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-deep-muted/70 text-xs">
            © {new Date().getFullYear()} {companyInfo.name}. All rights reserved.
          </p>
          <div className="flex gap-8 text-deep-muted/70 text-xs">
            <span className="hover:text-deep-muted transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-deep-muted transition-colors cursor-pointer">Terms of Service</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
