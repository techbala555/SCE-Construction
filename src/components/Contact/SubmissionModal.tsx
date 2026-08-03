"use client";

import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useMounted } from "@/src/lib/useMounted";

interface SubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "success" | "error";
  onRetry?: () => void;
}

/* ─── SVG icons ───────────────────────────────────────────────── */

function CheckmarkIcon() {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.15 }}
      className="mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/30"
    >
      <svg
        className="h-9 w-9 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={3}
      >
        <motion.path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 13l4 4L19 7"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, delay: 0.35 }}
        />
      </svg>
    </motion.div>
  );
}

function ErrorIcon() {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.15 }}
      className="mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-full bg-red-500 shadow-lg shadow-red-500/30"
    >
      <svg
        className="h-9 w-9 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={3}
      >
        <circle cx="12" cy="12" r="10" strokeWidth="2" />
        <motion.path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8v4m0 4h.01"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, delay: 0.35 }}
        />
      </svg>
    </motion.div>
  );
}

/* ─── Modal ───────────────────────────────────────────────────── */

export default function SubmissionModal({
  isOpen,
  onClose,
  type,
  onRetry,
}: SubmissionModalProps) {
  const mounted = useMounted();

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

  const isSuccess = type === "success";
  const title = isSuccess ? "Thank You!" : "Submission Failed";
  const message = isSuccess
    ? "Thank you for contacting Shylesh Circuits & Engineering.\n\nYour enquiry has been received successfully. Our team will contact you soon."
    : "Something went wrong. Please try again.";
  const primaryLabel = isSuccess ? "Submit Another Enquiry" : "Try Again";

  /* Don't render on server (createPortal needs document.body) */
  if (!mounted) return null;

  return createPortal(
    <AnimatePresence mode="wait">
      {isOpen && (
        /* Backdrop */
        <motion.div
          key="submission-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-md px-4"
          onClick={onClose}
          aria-hidden="true"
        >
          {/* Modal card */}
          <motion.div
            key="submission-modal-card"
            initial={{ scale: 0.9, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 12 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className="relative w-full max-w-md rounded-3xl p-10
                       bg-surface border border-border
                       shadow-2xl"
            style={{
              background: "var(--glass-bg)",
              backdropFilter: "blur(32px) saturate(200%)",
              WebkitBackdropFilter: "blur(32px) saturate(200%)",
            }}
          >
            {/* Subtle gold top accent */}
            <div className="absolute top-0 left-6 right-6 h-[2px] rounded-b-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

            {/* Icon */}
            <div className="mb-6">
              {isSuccess ? <CheckmarkIcon /> : <ErrorIcon />}
            </div>

            {/* Title */}
            <h2 className="mb-3 text-center text-2xl font-bold tracking-tight text-foreground">
              {title}
            </h2>

            {/* Message */}
            <p className="mb-8 whitespace-pre-line text-center text-sm leading-relaxed text-muted">
              {message}
            </p>

            {/* Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              {/* Primary action */}
              <button
                type="button"
                onClick={() => onRetry?.()}
                className="btn-shine inline-flex items-center justify-center rounded-xl
                           bg-primary text-btn-text px-6 py-3 text-sm font-semibold
                           hover:bg-primary-dark transition-all duration-300
                           hover:scale-[1.02] active:scale-[0.98]"
              >
                {primaryLabel}
              </button>

              {/* Close / outline button */}
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center justify-center rounded-xl
                           border border-border text-muted px-6 py-3 text-sm font-semibold
                           hover:text-foreground hover:border-foreground/30
                           transition-all duration-300"
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
