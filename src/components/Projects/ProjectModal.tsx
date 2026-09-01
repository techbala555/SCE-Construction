"use client";

import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X, MapPin, Calendar, ChevronLeft, ChevronRight, CheckCircle2, ArrowRight, AlertCircle, Loader2 } from "lucide-react";
import type { Project } from "@/src/data/content";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onInquire: () => void;
}

export default function ProjectModal({ project, onClose, onInquire }: ProjectModalProps) {
  const [mounted, setMounted] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const preloadedUrls = useRef<Set<string>>(new Set());
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Client mounting check for portal
  useEffect(() => {
    setMounted(true);
  }, []);

  // Unique gallery images
  const galleryList = useMemo(() => {
    if (!project) return [];
    const raw = project.gallery && project.gallery.length > 0 ? project.gallery : [project.image];
    return Array.from(new Set(raw));
  }, [project]);

  // Reset states on project change
  useEffect(() => {
    setActiveImageIndex(0);
    setImageLoading(true);
    setImageError(false);
  }, [project]);

  // Reset loading & error on image switch
  useEffect(() => {
    setImageLoading(true);
    setImageError(false);
  }, [activeImageIndex]);

  // Preload only the NEXT image
  useEffect(() => {
    if (!project || galleryList.length <= 1) return;

    const nextIdx = (activeImageIndex + 1) % galleryList.length;
    const nextUrl = galleryList[nextIdx];

    if (nextUrl && !preloadedUrls.current.has(nextUrl)) {
      preloadedUrls.current.add(nextUrl);
      const img = new window.Image();
      img.src = nextUrl;
    }
  }, [activeImageIndex, galleryList, project]);

  // Auto-scroll active thumbnail into view smoothly
  useEffect(() => {
    if (thumbnailRefs.current[activeImageIndex]) {
      thumbnailRefs.current[activeImageIndex]?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeImageIndex]);

  const handleNext = useCallback(() => {
    if (galleryList.length <= 1) return;
    setActiveImageIndex((prev) => (prev === galleryList.length - 1 ? 0 : prev + 1));
  }, [galleryList.length]);

  const handlePrev = useCallback(() => {
    if (galleryList.length <= 1) return;
    setActiveImageIndex((prev) => (prev === 0 ? galleryList.length - 1 : prev - 1));
  }, [galleryList.length]);

  // Keyboard navigation & Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (galleryList.length <= 1) return;
      if (e.key === "ArrowLeft") handlePrev();
      else if (e.key === "ArrowRight") handleNext();
    },
    [onClose, galleryList.length, handlePrev, handleNext]
  );

  // Body scroll lock with layout shift prevention
  useEffect(() => {
    if (project) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [project, handleKeyDown]);

  // Touch swipe handling for mobile
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = null;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 45;

    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }
  };

  if (!project || !mounted) return null;

  const activeImage = galleryList[activeImageIndex] || project.image;

  const modalContent = (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-2.5 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <div
        className="relative w-full max-w-4xl max-h-[94vh] bg-[#0b1329]/95 backdrop-blur-2xl border border-white/15 rounded-2xl sm:rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] overflow-hidden flex flex-col text-foreground"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-white/10 bg-white/[0.03] flex-shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <span className="px-3 py-1 rounded-full bg-primary/20 border border-primary/40 text-primary text-xs font-bold uppercase tracking-wider truncate">
              {project.category}
            </span>
            <span className="text-xs text-muted flex items-center gap-1 font-medium flex-shrink-0">
              <Calendar className="w-3.5 h-3.5 text-primary" />
              {project.year}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white/5 border border-white/15 flex items-center justify-center text-muted hover:text-white hover:bg-white/15 transition-colors flex-shrink-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Close gallery"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-4 sm:p-6 md:p-7 space-y-4 sm:space-y-6 flex-1 overscroll-contain">
          {/* Glassmorphism Image Stage (No solid grey bars) */}
          <div
            className="relative aspect-[16/10] min-h-[240px] sm:min-h-[380px] md:min-h-[420px] max-h-[58vh] w-full rounded-2xl overflow-hidden bg-gradient-to-b from-[#091124]/90 via-[#050915]/95 to-[#02050c]/95 backdrop-blur-xl border border-white/10 shadow-[inset_0_2px_16px_rgba(0,0,0,0.7)] select-none flex items-center justify-center group"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {/* Dark glass shimmer while image is loading */}
            {imageLoading && !imageError && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/[0.02] backdrop-blur-sm z-10 animate-pulse">
                <Loader2 className="w-8 h-8 text-primary animate-spin opacity-70" />
              </div>
            )}

            {/* Error Fallback */}
            {imageError ? (
              <div className="flex flex-col items-center justify-center gap-2 p-6 text-center z-10">
                <AlertCircle className="w-8 h-8 text-red-400" />
                <span className="text-sm font-medium text-muted">Image temporarily unavailable</span>
              </div>
            ) : (
              <Image
                src={activeImage}
                alt={`${project.title} - Photo ${activeImageIndex + 1} of ${galleryList.length}`}
                fill
                quality={90}
                priority={activeImageIndex === 0}
                sizes="(max-width: 640px) 95vw, (max-width: 1024px) 85vw, 900px"
                onLoad={() => setImageLoading(false)}
                onError={() => {
                  setImageLoading(false);
                  setImageError(true);
                }}
                className={`object-contain transition-opacity duration-300 ${
                  imageLoading ? "opacity-0" : "opacity-100"
                }`}
              />
            )}

            {/* Previous / Next Buttons */}
            {galleryList.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="absolute left-2.5 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center backdrop-blur-md border border-white/15 transition-all focus:outline-none focus:ring-2 focus:ring-primary shadow-lg cursor-pointer z-20 hover:scale-105 active:scale-95"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute right-2.5 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center backdrop-blur-md border border-white/15 transition-all focus:outline-none focus:ring-2 focus:ring-primary shadow-lg cursor-pointer z-20 hover:scale-105 active:scale-95"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                {/* Image Counter Badge */}
                <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/75 text-white text-xs font-semibold backdrop-blur-md border border-white/15 shadow-md pointer-events-none z-20">
                  {activeImageIndex + 1} / {galleryList.length}
                </div>
              </>
            )}
          </div>

          {/* Gallery Thumbnails Strip */}
          {galleryList.length > 1 && (
            <div className="relative">
              <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-1 pt-1 px-0.5 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                {galleryList.map((imgSrc, idx) => (
                  <button
                    key={imgSrc}
                    ref={(el) => {
                      thumbnailRefs.current[idx] = el;
                    }}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-14 h-10 sm:w-20 sm:h-14 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all cursor-pointer ${
                      idx === activeImageIndex
                        ? "border-primary scale-105 shadow-md ring-2 ring-primary/40"
                        : "border-white/10 opacity-55 hover:opacity-90 hover:border-white/30"
                    }`}
                    aria-label={`View photo ${idx + 1} of ${galleryList.length}`}
                  >
                    <Image
                      src={imgSrc}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      quality={60}
                      sizes="(max-width: 640px) 56px, 80px"
                      className="object-cover object-center"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Project Details */}
          <div className="space-y-4">
            <div>
              <h3 id="project-modal-title" className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 heading-md">
                {project.title}
              </h3>

              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-muted">
                <div className="flex items-center gap-1.5 font-medium text-white/90">
                  <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>{project.location}</span>
                </div>
                <span className="text-white/20">•</span>
                <span>Execution Year: {project.year}</span>
                <span className="text-white/20">•</span>
                <span className="text-primary font-semibold">{galleryList.length} Photos in Gallery</span>
              </div>
            </div>

            <p className="text-slate-300 body-relaxed text-xs sm:text-sm md:text-base leading-relaxed font-normal">
              {project.description}
            </p>

            {/* Key Project Execution Highlights */}
            {project.features && project.features.length > 0 && (
              <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10">
                <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-primary mb-3">
                  Project Execution Highlights
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
                  {project.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-2 text-xs sm:text-sm text-slate-200 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="p-4 sm:p-6 border-t border-white/10 bg-white/[0.02] flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 flex-shrink-0">
          <div className="text-xs text-muted text-center sm:text-left">
            Planning a similar project in {project.location.split(",")[0]}? Discuss your requirements with our civil engineers.
          </div>
          <button
            type="button"
            onClick={onInquire}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-primary text-btn-text text-xs sm:text-sm font-bold btn-shine shadow-md shadow-primary/20 hover:bg-primary-dark transition-all cursor-pointer"
          >
            <span>Inquire About Similar Project</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

