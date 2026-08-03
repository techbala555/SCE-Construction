"use client";

import { useState, useRef, useEffect, useCallback, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CustomSelectProps {
  id: string;
  label: string;
  required?: boolean;
  options: readonly string[];
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  error?: string;
  isTouched?: boolean;
  isValid?: boolean;
}

export default function CustomSelect({
  id,
  label,
  required,
  options,
  value,
  onChange,
  placeholder,
  error,
  isTouched,
  isValid,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isOpen) {
        if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
          e.preventDefault();
          setIsOpen(true);
          setFocusedIndex(options.indexOf(value) >= 0 ? options.indexOf(value) : 0);
        }
        return;
      }

      switch (e.key) {
        case "Escape":
          e.preventDefault();
          setIsOpen(false);
          break;
        case "ArrowDown":
          e.preventDefault();
          setFocusedIndex((prev) => (prev < options.length - 1 ? prev + 1 : 0));
          break;
        case "ArrowUp":
          e.preventDefault();
          setFocusedIndex((prev) => (prev > 0 ? prev - 1 : options.length - 1));
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          if (focusedIndex >= 0 && focusedIndex < options.length) {
            onChange(options[focusedIndex]);
            setIsOpen(false);
          }
          break;
        case "Tab":
          setIsOpen(false);
          break;
      }
    },
    [isOpen, options, value, focusedIndex, onChange],
  );

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  const showSuccess = isTouched && isValid && !!value && !error;
  const showError = !!error;

  return (
    <div className="relative" ref={containerRef}>
      <label
        htmlFor={id}
        className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-3"
      >
        {label} {required && <span className="text-primary">*</span>}
      </label>

      {/* Trigger Button */}
      <button
        type="button"
        id={id}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-invalid={showError}
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        className={`input-premium flex items-center justify-between text-left cursor-pointer transition-all duration-200 select-none
          ${showError ? "!border-red-500/90 focus:!ring-red-500/20" : ""}
          ${showSuccess ? "!border-emerald-500/80 focus:!ring-emerald-500/20" : ""}
          ${isOpen ? "!border-primary shadow-md shadow-primary/10" : ""}
        `}
      >
        <span className={`truncate text-sm font-medium ${value ? "text-foreground" : "text-muted/70"}`}>
          {value || placeholder}
        </span>

        <div className="flex items-center gap-1.5 flex-shrink-0 ml-2">
          {showSuccess && (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-emerald-500">
              <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-transform duration-300 ${isOpen ? "rotate-180 text-primary" : "text-muted"}`}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </button>

      {/* Inline Error Message */}
      {showError && (
        <p className="mt-2 text-xs text-red-500 flex items-center gap-1">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/></svg>
          {error}
        </p>
      )}

      {/* Animated Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={listboxId}
            role="listbox"
            aria-label={label}
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-0 right-0 top-full mt-2 z-50 rounded-2xl
                       bg-surface border border-border shadow-2xl overflow-hidden p-1.5"
            style={{
              background: "var(--glass-bg)",
              backdropFilter: "blur(24px) saturate(180%)",
              WebkitBackdropFilter: "blur(24px) saturate(180%)",
            }}
          >
            <div className="max-h-60 overflow-y-auto space-y-1 py-0.5 custom-scrollbar">
              {options.map((option, index) => {
                const isSelected = option === value;
                const isFocused = index === focusedIndex;

                return (
                  <button
                    key={option}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(option)}
                    onMouseEnter={() => setFocusedIndex(index)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium
                                transition-all duration-150 flex items-center justify-between group cursor-pointer
                                ${isSelected
                                  ? "bg-primary/15 text-primary font-semibold"
                                  : isFocused
                                    ? "bg-primary/10 text-foreground"
                                    : "text-foreground hover:bg-primary/10 hover:text-foreground"
                                }`}
                  >
                    <span className="truncate">{option}</span>
                    {isSelected && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-primary flex-shrink-0 ml-2">
                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
