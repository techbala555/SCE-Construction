"use client";

import { useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Check, AlertCircle } from "lucide-react";
import { useMounted } from "@/src/lib/useMounted";

interface SubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "success" | "error";
  customTitle?: string;
  customMessage?: string;
  onRetry?: () => void;
}

/* ── Focus Trap Utility ─────────────────────────────────────── */
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

/* ─── SVG Icons with Soft Glow ────────────────────────────────── */

function CheckmarkIcon() {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 280, damping: 20, delay: 0.12 }}
      className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500 text-white shadow-xl shadow-emerald-500/25 ring-8 ring-emerald-500/10 dark:ring-emerald-500/20"
    >
      <Check className="h-10 w-10 text-white" strokeWidth={3} aria-hidden="true" />
    </motion.div>
  );
}

function ErrorIcon() {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 280, damping: 20, delay: 0.12 }}
      className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-500 text-white shadow-xl shadow-red-500/25 ring-8 ring-red-500/10 dark:ring-red-500/20"
    >
      <AlertCircle className="h-10 w-10 text-white" strokeWidth={2.5} aria-hidden="true" />
    </motion.div>
  );
}

/* ─── Submission Modal ───────────────────────────────────────── */

export default function SubmissionModal({
  isOpen,
  onClose,
  type,
  customTitle,
  customMessage,
  onRetry,
}: SubmissionModalProps) {
  const mounted = useMounted();
  const modalRef = useRef<HTMLDivElement>(null);

  /* Close on Escape key */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  useFocusTrap(isOpen, modalRef);

  const isSuccess = type === "success";
  const title = customTitle || (isSuccess ? "Thank You!" : "Submission Failed");
  const message =
    customMessage ||
    (isSuccess
      ? "Thank you for contacting Shylesh Circuit & Engineering.\n\nYour enquiry has been received successfully. Our team will contact you soon."
      : "Something went wrong. Please try again.");
  const primaryLabel = isSuccess ? "Submit Another Enquiry" : "Try Again";

  /* Don't render on server (createPortal needs document.body) */
  if (!mounted) return null;

  return createPortal(
    <AnimatePresence mode="wait">
      {isOpen && (
        /* Backdrop Overlay */
        <motion.div
          key="submission-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/65 dark:bg-black/80 backdrop-blur-md p-4 sm:p-6"
          onClick={onClose}
          aria-hidden="true"
        >
          {/* Modal Container */}
          <motion.div
            ref={modalRef}
            key="submission-modal-card"
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 12 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className="relative w-full max-w-md rounded-3xl p-8 sm:p-10
                       bg-surface border border-border
                       shadow-2xl overflow-hidden select-none"
          >
            {/* Top Gold Accent Line */}
            <div className="absolute top-0 left-8 right-8 h-[3px] rounded-b-full bg-gradient-to-r from-transparent via-primary to-transparent z-10 pointer-events-none" />

            {/* Icon */}
            <div className="mb-6 sm:mb-7 flex items-center justify-center">
              {isSuccess ? <CheckmarkIcon /> : <ErrorIcon />}
            </div>

            {/* Title */}
            <h2 className="mb-3 text-center text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground leading-snug">
              {title}
            </h2>

            {/* Message Description */}
            <p className="mb-8 whitespace-pre-line text-center text-sm sm:text-base leading-relaxed text-muted max-w-sm mx-auto">
              {message}
            </p>

            {/* Button Hierarchy */}
            <div className="flex flex-col gap-3.5 w-full">
              {/* Primary Action Button */}
              <button
                type="button"
                onClick={() => (onRetry ? onRetry() : onClose())}
                className="btn-shine w-full min-h-[50px] sm:min-h-[52px] py-3.5 px-6 rounded-2xl
                           bg-primary text-btn-text text-sm sm:text-base font-bold
                           hover:bg-primary-dark transition-all duration-300
                           shadow-md shadow-primary/20 hover:scale-[1.01] active:scale-[0.98]
                           flex items-center justify-center"
              >
                {primaryLabel}
              </button>

              {/* Secondary Close Button */}
              <button
                type="button"
                onClick={onClose}
                className="w-full min-h-[50px] sm:min-h-[52px] py-3.5 px-6 rounded-2xl
                           bg-surface-elevated border border-border text-foreground text-sm sm:text-base font-bold
                           hover:bg-surface-elevated/80 transition-all duration-300
                           shadow-xs hover:scale-[1.01] active:scale-[0.98]
                           flex items-center justify-center"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
