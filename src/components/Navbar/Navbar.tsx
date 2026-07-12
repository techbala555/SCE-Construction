"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { navigationItems, companyInfo } from "@/src/data/content";
import ThemeToggle from "@/src/components/ThemeToggle/ThemeToggle";
import { useMounted } from "@/src/lib/useMounted";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();

  // Logo follows the NAVBAR BACKGROUND, not the theme:
  //   • Transparent over the dark Hero   → white logo (/logo-light.svg)
  //   • Glass once scrolled (light theme) → dark logo  (/logo-dark.svg)
  //   • Glass once scrolled (dark theme)  → keep white logo — the glass itself is
  //     dark, so a dark logo would vanish. (Theme defaults to light, so in the
  //     default experience this is purely isScrolled-driven, as intended.)
  const isDark = mounted && resolvedTheme === "dark";
  const showDarkLogo = isScrolled && !isDark;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);

      const sections = navigationItems.map((item) => item.href.replace("#", ""));
      let current = sections[0];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) {
          current = id;
        }
      }
      setActiveSection(`#${current}`);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      setIsMobileOpen(false);
    },
    [],
  );

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? "glass" : "bg-transparent"
      }`}
    >
      {/* Full-width container — no max-width so logo can breathe */}
      <div className="w-full px-5 md:px-8 lg:px-10 xl:px-12">
        {/*
          True 3-column layout on xl — equal side columns (1fr) flanking an
          auto-width centre. Because LEFT and RIGHT grow identically, the centre
          navigation is locked to the exact viewport centre regardless of the
          logo or CTA width (no layout shift when either side changes width).
        */}
        <div className="relative flex items-center h-20 md:h-[88px] lg:h-[100px] xl:h-[120px] xl:grid xl:grid-cols-[1fr_auto_1fr]">

          {/* ── LEFT: Logo — cross-fades with the navbar background ── */}
          <a
            href="#home"
            onClick={(e) => scrollTo(e, "#home")}
            className="relative flex items-center flex-shrink-0 xl:justify-self-start"
          >
            {/* White logo — visible over the dark Hero (and dark-theme glass) */}
            <Image
              src="/logo-light.svg"
              alt="Shylesh Circuits & Engineering Builders & Developers"
              width={804}
              height={572}
              priority
              className={`w-auto h-[58px] md:h-[68px] lg:h-[76px] xl:h-[82px] max-w-none object-contain transition-opacity duration-300 ease-out ${
                showDarkLogo ? "opacity-0" : "opacity-100"
              }`}
            />
            {/* Dark logo — fades in over the light glass navbar; overlays the white one */}
            <Image
              src="/logo-dark.svg"
              alt=""
              aria-hidden="true"
              width={804}
              height={572}
              priority
              className={`absolute left-0 top-1/2 -translate-y-1/2 w-auto h-[58px] md:h-[68px] lg:h-[76px] xl:h-[82px] max-w-none object-contain transition-opacity duration-300 ease-out ${
                showDarkLogo ? "opacity-100" : "opacity-0"
              }`}
            />
          </a>

          {/* ── CENTER: Navigation — auto-width column, perfectly centred ── */}
          <div className="hidden xl:flex items-center justify-center min-w-0">
            <ul className="flex items-center gap-5 2xl:gap-8">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => scrollTo(e, item.href)}
                    className={`relative py-3 px-1 text-[0.8125rem] font-medium tracking-wide whitespace-nowrap transition-colors duration-300 ${
                      activeSection === item.href
                        ? "text-primary"
                        : isScrolled
                          ? "text-muted hover:text-foreground"
                          : "text-white/70 hover:text-white"
                    }`}
                  >
                    {item.label}
                    {activeSection === item.href && (
                      <motion.span
                        layoutId="active-nav"
                        className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary rounded-full"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── RIGHT: Theme Toggle + CTA + Hamburger — end-aligned in right column ── */}
          <div className="flex items-center ml-auto xl:ml-0 flex-shrink-0 gap-4 md:gap-6 xl:gap-6 xl:justify-self-end">
            <ThemeToggle />

            <a
              href="#contact"
              onClick={(e) => scrollTo(e, "#contact")}
              className="hidden md:inline-flex items-center justify-center h-[52px] px-8 text-sm font-semibold rounded-lg
                         bg-primary text-[#0B1F3A] hover:bg-primary-dark
                         btn-shine transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              {companyInfo.cta}
            </a>

            {/* Hamburger — shows below xl */}
            <button
              onClick={() => setIsMobileOpen((p) => !p)}
              className="xl:hidden w-11 h-11 flex flex-col justify-center items-center gap-[6px]"
              aria-label="Toggle menu"
            >
              <span className={`block w-[22px] h-[1.5px] rounded-full transition-all duration-300 ${
                isScrolled ? "bg-foreground" : "bg-white"
              } ${isMobileOpen ? "rotate-45 translate-y-[7.5px]" : ""}`} />
              <span className={`block w-[22px] h-[1.5px] rounded-full transition-all duration-300 ${
                isScrolled ? "bg-foreground" : "bg-white"
              } ${isMobileOpen ? "opacity-0" : ""}`} />
              <span className={`block w-[22px] h-[1.5px] rounded-full transition-all duration-300 ${
                isScrolled ? "bg-foreground" : "bg-white"
              } ${isMobileOpen ? "-rotate-45 -translate-y-[7.5px]" : ""}`} />
            </button>
          </div>

        </div>
      </div>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="xl:hidden fixed inset-0 top-20 md:top-[88px] lg:top-[100px] z-40"
            style={{
              background: "var(--glass-bg)",
              backdropFilter: "blur(32px) saturate(200%)",
              WebkitBackdropFilter: "blur(32px) saturate(200%)",
            }}
          >
            <ul className="flex flex-col items-center justify-center h-full gap-9 pb-28">
              {navigationItems.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                >
                  <a
                    href={item.href}
                    onClick={(e) => scrollTo(e, item.href)}
                    className={`text-2xl font-semibold transition-colors duration-300 ${
                      activeSection === item.href ? "text-primary" : "text-muted hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="mt-6"
              >
                <a
                  href="#contact"
                  onClick={(e) => scrollTo(e, "#contact")}
                  className="inline-flex items-center justify-center h-14 px-12 text-lg font-semibold rounded-xl
                             bg-primary text-[#0B1F3A] hover:bg-primary-dark btn-shine transition-all duration-300"
                >
                  {companyInfo.cta}
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
