"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";
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
            {/* Official Logo */}
            <div className="mb-6 sm:mb-10">
              <Image
                src="/logo-light.svg"
                alt="Shylesh Circuits & Engineering Builders & Developers"
                width={804}
                height={572}
                className="w-auto h-16 sm:h-24 lg:h-28 max-w-full object-contain"
              />
            </div>
            <p className="text-deep-muted text-sm body-relaxed max-w-xs">
              {companyInfo.tagline}. Complete construction, land development, and real estate solutions built on trust and quality.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={staggerItem}>
            <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-7">
              Quick Links
            </h3>
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
            <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-7">
              Services
            </h3>
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
            <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-7">
              Contact Info
            </h3>
            <div className="space-y-5 text-deep-muted text-sm">
              <a
                href={contactDetails.mapUrl || "https://www.google.com/maps/place/Circuit+%26+Engineering+Electrical+Work/@11.0490908,76.9223518,17z/data=!3m1!4b1!4m6!3m5!1s0x3ba859728aa80393:0x1861b2c7c4c52dce!8m2!3d11.0490908!4d76.9223518!16s%2Fg%2F11b8z0k5t_"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-3 items-start hover:text-primary transition-colors group cursor-pointer"
                aria-label="Open Circuit & Engineering Electrical Work office location on Google Maps (opens in a new tab)"
              >
                <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5 transition-transform group-hover:scale-110" strokeWidth={1.8} aria-hidden="true" />
                <span className="group-hover:underline leading-relaxed">{contactDetails.address}</span>
              </a>
              <a
                href={`tel:${contactDetails.phone.replace(/\s+/g, "")}`}
                className="flex gap-3 items-center hover:text-primary transition-colors group"
                aria-label={`Call ${contactDetails.phone}`}
              >
                <Phone className="w-4 h-4 text-primary flex-shrink-0 transition-transform group-hover:scale-110" strokeWidth={1.8} aria-hidden="true" />
                <span className="group-hover:underline">{contactDetails.phone}</span>
              </a>
              <a
                href={`mailto:${contactDetails.email}`}
                className="flex gap-3 items-center hover:text-primary transition-colors duration-300 group min-w-0 cursor-pointer"
                aria-label={`Send email to ${contactDetails.email}`}
              >
                <Mail className="w-4 h-4 text-primary flex-shrink-0 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.8} aria-hidden="true" />
                <span className="group-hover:underline break-all sm:break-normal">{contactDetails.email}</span>
              </a>
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
