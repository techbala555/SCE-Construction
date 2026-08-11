"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { navigationItems, companyInfo } from "@/src/data/content";
import ThemeToggle from "@/src/components/ThemeToggle/ThemeToggle";
import { useMounted } from "@/src/lib/useMounted";
import { scrollToSection } from "@/src/lib/scrollToSection";

/* ── Focus-trap utility for mobile menu overlay ─────────────── */
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

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");
  const [navHidden, setNavHidden] = useState(false);
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const isDark = mounted && resolvedTheme === "dark";

  /* ── Auto-hide scroll tracking refs ────────────────────── */
  const lastScrollY = useRef(0);
  const scrollDelta = useRef(0);
  const ticking = useRef(false);
  const navHiddenRef = useRef(false);

  useEffect(() => {
    navHiddenRef.current = navHidden;
  }, [navHidden]);

  /* ── Active Section Intersection Observer (Zero Main-Thread Reflows) ── */
  useEffect(() => {
    const sectionIds = navigationItems.map((item) => item.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-15% 0px -65% 0px", threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  /* ── Optimised scroll handler (rAF-throttled) ──────────── */
  useEffect(() => {
    const HIDE_DELTA = 25;
    const SHOW_DELTA = 15;
    const SCROLL_THRESHOLD = 20;

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const y = window.scrollY;
        const diff = y - lastScrollY.current;

        if (diff > 0) {
          scrollDelta.current = (scrollDelta.current < 0 ? 0 : scrollDelta.current) + diff;
        } else if (diff < 0) {
          scrollDelta.current = (scrollDelta.current > 0 ? 0 : scrollDelta.current) + diff;
        }

        // Navbar background solid past 20px (guarded against redundant state updates)
        setIsScrolled((prev) => (prev !== (y > SCROLL_THRESHOLD) ? (y > SCROLL_THRESHOLD) : prev));

        // Auto-hide navbar past 450px threshold on fast downward scroll
        const shouldHide = y > 450 && scrollDelta.current > HIDE_DELTA && !isMobileOpen;
        const shouldShow = scrollDelta.current < -SHOW_DELTA;

        if (y <= 450) {
          setNavHidden((prev) => (prev ? false : prev));
        } else if (shouldHide) {
          setNavHidden((prev) => (!prev ? true : prev));
          scrollDelta.current = 0;
        } else if (shouldShow) {
          setNavHidden((prev) => (prev ? false : prev));
          scrollDelta.current = 0;
        }

        lastScrollY.current = y;
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobileOpen]);

  /* ── Mouse proximity: reveal when pointer near top edge ── */
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (e.clientY <= 20 && navHiddenRef.current) {
        setNavHidden(false);
      }
    };

    document.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => document.removeEventListener("mousemove", onMouseMove);
  }, []);

  /* ── ESC key closes mobile menu ─────────────────────────── */
  useEffect(() => {
    if (!isMobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isMobileOpen]);

  const scrollTo = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string) => {
      e.preventDefault();
      setNavHidden(false);
      setIsMobileOpen(false);
      scrollToSection(href);
    },
    [],
  );

  /* ── Lock body scroll when mobile menu is open ──────────── */
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  /* ── Focus trap for mobile menu accessibility ───────────── */
  useFocusTrap(isMobileOpen, mobileMenuRef);

  /* ── Close mobile menu on window resize past breakpoint ─── */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1280 && isMobileOpen) {
        setIsMobileOpen(false);
      }
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, [isMobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[100] transition-transform duration-300 ease-in-out ${
          isScrolled
            ? "bg-[#0B1220] border-b border-white/[0.06] shadow-md shadow-black/20 backdrop-blur-md"
            : "bg-transparent border-b border-transparent shadow-none"
        } ${navHidden ? "pointer-events-none" : ""}`}
        style={{
          transform: navHidden ? "translateY(-100%)" : "translateY(0)",
          willChange: "transform",
        }}
        onFocusCapture={() => setNavHidden(false)}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Full-width container */}
        <div className="w-full px-5 md:px-8 lg:px-10 xl:px-12">
          <div className="relative flex items-center h-16 sm:h-[72px] md:h-[80px] lg:h-[88px] xl:h-[100px] xl:grid xl:grid-cols-[1fr_auto_1fr]">
            {/* ── LEFT: Brand Logo ── */}
            <a
              href="#home"
              onClick={(e) => scrollTo(e, "#home")}
              className="relative flex items-center flex-shrink-0 xl:justify-self-start group"
            >
              <Image
                src="/logo-light.svg"
                alt="Shylesh Circuits & Engineering Builders & Developers"
                width={804}
                height={572}
                priority
                className="w-auto h-[48px] sm:h-[54px] md:h-[62px] lg:h-[70px] xl:h-[76px] max-w-none object-contain transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </a>

            {/* ── CENTER: Navigation Links (Desktop) ── */}
            <div className="hidden xl:flex items-center justify-center min-w-0">
              <ul className="flex items-center gap-6 2xl:gap-8">
                {navigationItems.map((item) => {
                  const isActive = activeSection === item.href;
                  return (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        onClick={(e) => scrollTo(e, item.href)}
                        className={`relative py-3 px-1 text-[0.9375rem] font-medium tracking-wide whitespace-nowrap transition-colors duration-300 ${
                          isActive
                            ? "text-primary font-semibold"
                            : "text-white/80 hover:text-white"
                        }`}
                      >
                        {item.label}
                        {isActive && (
                          <motion.span
                            layoutId="active-nav"
                            className="absolute -bottom-1 left-0 right-0 h-[2.5px] bg-primary rounded-full shadow-[0_0_8px_rgba(212,160,23,0.6)]"
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          />
                        )}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* ── RIGHT: Theme Toggle + CTA + Mobile Hamburger ── */}
            <div className="flex items-center ml-auto xl:ml-0 flex-shrink-0 gap-3 sm:gap-4 md:gap-5 xl:gap-6 xl:justify-self-end">
              <ThemeToggle />

              <a
                href="#contact"
                onClick={(e) => scrollTo(e, "#contact")}
                className="hidden lg:inline-flex items-center justify-center h-11 xl:h-12 px-6 xl:px-8 text-sm font-bold rounded-xl
                           bg-primary text-btn-text hover:bg-primary-dark
                           btn-shine transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]
                           shadow-md shadow-primary/20"
              >
                {companyInfo.cta}
              </a>

              {/* Hamburger Button (visible on mobile / tablet) */}
              <button
                onClick={() => setIsMobileOpen(true)}
                className="xl:hidden relative w-10 h-10 flex flex-col justify-center items-center gap-[5px]
                           rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white
                           transition-all duration-200 active:scale-95
                           focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                aria-label="Open mobile menu"
                aria-expanded={isMobileOpen}
                aria-controls="mobile-menu-portal"
              >
                <span className="block w-[20px] h-[2px] rounded-full bg-white transition-colors" />
                <span className="block w-[20px] h-[2px] rounded-full bg-white transition-colors" />
                <span className="block w-[20px] h-[2px] rounded-full bg-white transition-colors" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ── FULL SCREEN MOBILE MENU OVERLAY (Rendered via Portal) ──────── */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {isMobileOpen && (
              <motion.div
                ref={mobileMenuRef}
                id="mobile-menu-portal"
                role="dialog"
                aria-modal="true"
                aria-label="Mobile navigation menu"
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.28, ease: [0.33, 1, 0.68, 1] }}
                className="xl:hidden fixed inset-0 z-[100] flex flex-col w-screen h-[100dvh] overflow-hidden select-none"
                style={{
                  background: isDark
                    ? "rgba(11, 18, 32, 0.98)"
                    : "rgba(255, 255, 255, 0.98)",
                  backdropFilter: "blur(24px) saturate(200%)",
                  WebkitBackdropFilter: "blur(24px) saturate(200%)",
                }}
              >
                {/* ── Top Bar inside Portal ── */}
                <div className="flex items-center justify-between px-5 sm:px-8 h-16 sm:h-[72px] border-b border-border/50 flex-shrink-0">
                  {/* Brand Logo */}
                  <a
                    href="#home"
                    onClick={(e) => scrollTo(e, "#home")}
                    className="flex items-center"
                  >
                    <Image
                      src={isDark ? "/logo-light.svg" : "/logo-dark.svg"}
                      alt="Shylesh Circuits & Engineering"
                      width={804}
                      height={572}
                      className="w-auto h-[44px] sm:h-[50px] object-contain"
                    />
                  </a>

                  {/* Header Actions: Theme Toggle + Close (X) */}
                  <div className="flex items-center gap-3">
                    <ThemeToggle />

                    <button
                      onClick={() => setIsMobileOpen(false)}
                      className="w-10 h-10 flex items-center justify-center rounded-xl bg-surface-elevated text-foreground hover:bg-primary/20 hover:text-primary transition-all duration-200 border border-border/50"
                      aria-label="Close menu"
                    >
                      <X className="w-5 h-5" strokeWidth={2} aria-hidden="true" />
                    </button>
                  </div>
                </div>

                {/* ── Scrollable Menu Content ── */}
                <div className="flex-1 flex flex-col justify-between overflow-y-auto px-6 py-8">
                  {/* Navigation Links */}
                  <ul className="flex flex-col gap-2.5 max-w-sm mx-auto w-full">
                    {navigationItems.map((item, i) => {
                      const isActive = activeSection === item.href;
                      return (
                        <motion.li
                          key={item.href}
                          initial={{ opacity: 0, y: 14 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: 0.04 * i,
                            duration: 0.3,
                            ease: [0.33, 1, 0.68, 1],
                          }}
                        >
                          <a
                            href={item.href}
                            onClick={(e) => scrollTo(e, item.href)}
                            className={`flex items-center gap-4 px-5 py-3.5 text-lg font-semibold rounded-xl transition-all duration-200 ${
                              isActive
                                ? "bg-primary/15 text-primary border border-primary/20 shadow-sm"
                                : "text-foreground hover:bg-surface-elevated hover:text-primary"
                            }`}
                          >
                            <span
                              className={`w-2.5 h-2.5 rounded-full transition-transform ${
                                isActive
                                  ? "bg-primary scale-110"
                                  : "bg-muted/40"
                              }`}
                            />
                            <span>{item.label}</span>
                          </a>
                        </motion.li>
                      );
                    })}
                  </ul>

                  {/* ── Bottom Section: Primary CTA + Branding ── */}
                  <div className="mt-8 max-w-sm mx-auto w-full space-y-6 pt-6 border-t border-border/50 text-center">
                    <a
                      href="#contact"
                      onClick={(e) => scrollTo(e, "#contact")}
                      className="flex items-center justify-center w-full h-14 text-base font-bold rounded-xl bg-primary text-btn-text hover:bg-primary-dark btn-shine shadow-lg transition-all active:scale-[0.98]"
                    >
                      {companyInfo.cta}
                    </a>

                    <div className="space-y-1">
                      <p className="text-xs font-bold tracking-widest text-muted uppercase">
                        Shylesh Circuits & Engineering
                      </p>
                      <p className="text-[11px] text-muted/70">
                        Builders & Developers • Coimbatore, Tamil Nadu
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
