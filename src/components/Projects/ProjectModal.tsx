"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import Image from "next/image";
import { X, MapPin, Calendar, ChevronLeft, ChevronRight, CheckCircle2, ArrowRight } from "lucide-react";
import type { Project } from "@/src/data/content";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onInquire: () => void;
}

export default function ProjectModal({ project, onClose, onInquire }: ProjectModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Guarantee unique gallery images with no duplicate paths
  const galleryList = useMemo(() => {
    if (!project) return [];
    const raw = project.gallery && project.gallery.length > 0 ? project.gallery : [project.image];
    return Array.from(new Set(raw));
  }, [project]);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [project]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (galleryList.length <= 1) return;
      if (e.key === "ArrowLeft") {
        setActiveImageIndex((prev) => (prev === 0 ? galleryList.length - 1 : prev - 1));
      } else if (e.key === "ArrowRight") {
        setActiveImageIndex((prev) => (prev === galleryList.length - 1 ? 0 : prev + 1));
      }
    },
    [onClose, galleryList]
  );

  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, handleKeyDown]);

  if (!project) return null;

  const activeImage = galleryList[activeImageIndex] || project.image;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-surface border border-border/80 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border/70 bg-surface-elevated flex-shrink-0">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-primary/15 border border-primary/30 text-primary text-xs font-bold uppercase tracking-wider">
              {project.category}
            </span>
            <span className="text-xs text-muted flex items-center gap-1 font-medium">
              <Calendar className="w-3.5 h-3.5 text-primary" />
              {project.year}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-surface border border-border flex items-center justify-center text-muted hover:text-foreground hover:bg-surface-elevated transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6 flex-1">
          {/* Main Visual Image Area */}
          <div className="relative aspect-[16/10] sm:aspect-[16/10] min-h-[260px] sm:min-h-[420px] max-h-[65vh] w-full rounded-2xl overflow-hidden bg-black/40 border border-border shadow-inner group">
            <Image
              src={activeImage}
              alt={`${project.title} - ${project.location}`}
              fill
              quality={90}
              priority={activeImageIndex === 0}
              sizes="(max-width: 640px) 95vw, (max-width: 1024px) 85vw, 850px"
              className="object-contain transition-all duration-300"
            />

            {/* Previous / Next Buttons if multiple gallery photos exist */}
            {galleryList.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImageIndex((prev) => (prev === 0 ? galleryList.length - 1 : prev - 1));
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-sm transition-all"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImageIndex((prev) => (prev === galleryList.length - 1 ? 0 : prev + 1));
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-sm transition-all"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
                {/* Photo indicator badge */}
                <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/70 text-white text-xs font-semibold backdrop-blur-sm">
                  {activeImageIndex + 1} / {galleryList.length}
                </div>
              </>
            )}
          </div>

          {/* Gallery Thumbnails (if > 1) */}
          {galleryList.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {galleryList.map((imgSrc, idx) => (
                <button
                  key={imgSrc}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-14 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                    idx === activeImageIndex ? "border-primary scale-105 shadow-md" : "border-border opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image src={imgSrc} alt={`Thumbnail ${idx + 1}`} fill sizes="80px" className="object-cover object-center" />
                </button>
              ))}
            </div>
          )}

          {/* Project Details */}
          <div>
            <h3 id="project-modal-title" className="text-2xl sm:text-3xl font-bold text-foreground mb-3 heading-md">
              {project.title}
            </h3>

            <div className="flex items-center gap-2 text-sm text-muted mb-5">
              <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="font-medium text-foreground">{project.location}</span>
              <span className="text-border">•</span>
              <span>Execution Year: {project.year}</span>
            </div>

            <p className="text-secondary body-relaxed text-sm sm:text-base leading-relaxed mb-6 font-normal">
              {project.description}
            </p>

            {/* Key Project Highlights */}
            {project.features && project.features.length > 0 && (
              <div className="mb-6 p-5 rounded-2xl bg-surface-elevated border border-border">
                <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-3.5">
                  Project Execution Highlights
                </h4>
                <div className="grid sm:grid-cols-3 gap-3">
                  {project.features.map((feat) => (
                    <div key={feat} className="flex items-center gap-2 text-xs sm:text-sm text-foreground font-medium">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="p-5 sm:p-6 border-t border-border/80 bg-surface-elevated flex flex-col sm:flex-row items-center justify-between gap-4 flex-shrink-0">
          <div className="text-xs text-muted text-center sm:text-left">
            Have a project in {project.location.split(",")[0]}? Discuss your plan with our engineering team.
          </div>
          <button
            type="button"
            onClick={onInquire}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-btn-text text-sm font-bold btn-shine shadow-md shadow-primary/20 hover:bg-primary-dark transition-all"
          >
            <span>Inquire About Similar Project</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
