import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { companyInfo, navigationItems, contactDetails, services } from "@/src/data/content";

const serviceRoutes: Record<string, string> = {
  construction: "/services/house-construction",
  "land-development": "/services/land-development",
  "real-estate": "/services/plot-promotion",
  "future-projects": "/services/farmhouse-projects",
  "elevation-3d": "/services/3d-elevation-design",
};

export default function Footer() {
  return (
    <footer className="bg-footer-bg text-deep-text relative overflow-hidden">
      {/* Top Gold Line */}
      <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 pt-16 lg:pt-[120px] pb-10 lg:pb-[60px]">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            {/* Official Logo */}
            <div className="mb-6 sm:mb-10">
              <Image
                src="/logo-light.svg"
                alt="Shylesh Circuit & Engineering Builders & Developers"
                width={804}
                height={572}
                className="w-auto h-16 sm:h-24 lg:h-28 max-w-full object-contain"
              />
            </div>
            <p className="text-deep-muted text-sm body-relaxed max-w-xs">
              {companyInfo.tagline}. Complete construction, land development, and real estate solutions built on trust and quality.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-[#E6B325] uppercase tracking-wider mb-7">
              Quick Links
            </h3>
            <ul className="space-y-4">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-deep-muted hover:text-[#E6B325] text-sm transition-colors duration-300
                               inline-flex items-center gap-1.5 group"
                  >
                    <span className="w-0 group-hover:w-2 h-[1px] bg-[#E6B325] transition-all duration-300" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-bold text-[#E6B325] uppercase tracking-wider mb-7">
              Services
            </h3>
            <ul className="space-y-4">
              {services.slice(0, 5).map((service) => (
                <li key={service.id}>
                  {serviceRoutes[service.id] ? (
                    <Link
                      href={serviceRoutes[service.id]}
                      className="text-deep-muted hover:text-[#E6B325] text-sm transition-colors duration-300 inline-flex items-center gap-1.5 group"
                    >
                      <span className="w-0 group-hover:w-2 h-[1px] bg-[#E6B325] transition-all duration-300" />
                      {service.title}
                    </Link>
                  ) : (
                    <span className="text-deep-muted text-sm cursor-default">
                      {service.title}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold text-[#E6B325] uppercase tracking-wider mb-7">
              Contact Info
            </h3>
            <div className="space-y-5 text-deep-muted text-sm">
              <a
                href={contactDetails.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-3 items-start hover:text-primary transition-colors group cursor-pointer"
                aria-label={`${contactDetails.address}. Open Shylesh Circuit & Engineering office location on Google Maps (opens in a new tab)`}
              >
                <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5 transition-transform group-hover:scale-110" strokeWidth={1.8} aria-hidden="true" />
                <div>
                  <span className="group-hover:underline leading-relaxed block">{contactDetails.address}</span>
                  <span className="text-xs text-primary/80 font-medium mt-1 block">GSTIN: {contactDetails.gstin}</span>
                </div>
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
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 lg:mt-20 pt-8 border-t border-deep-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-deep-muted text-xs">
            © {new Date().getFullYear()} {companyInfo.name}. All rights reserved.
          </p>
          <div className="flex gap-8 text-deep-muted text-xs">
            <Link href="/privacy-policy" className="hover:text-primary transition-colors cursor-pointer">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-primary transition-colors cursor-pointer">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

