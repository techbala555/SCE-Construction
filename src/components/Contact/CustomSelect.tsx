"use client";

import { useState, useRef, useEffect, useCallback, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check, AlertCircle } from "lucide-react";

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
        className="block text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider mb-2"
      >
        {label} {required && <span className="text-primary font-bold">*</span>}
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
        className={`w-full px-4 py-3 bg-white dark:bg-slate-800/80 border border-gray-300 dark:border-white/10 rounded-xl
          text-gray-900 dark:text-white text-sm font-medium
          flex items-center justify-between text-left cursor-pointer transition-all duration-200 select-none
          focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40
          ${showError ? "!border-red-500/90 focus:!ring-red-500/20" : ""}
          ${showSuccess ? "!border-emerald-500/80 focus:!ring-emerald-500/20" : ""}
          ${isOpen ? "!border-primary shadow-md shadow-primary/10" : ""}
        `}
      >
        <span className={`truncate text-sm font-medium ${value ? "text-gray-900 dark:text-white" : "text-gray-400 dark:text-gray-400"}`}>
          {value || placeholder}
        </span>

        <div className="flex items-center gap-1.5 flex-shrink-0 ml-2">
          {showSuccess && (
            <Check className="w-4 h-4 text-emerald-500" strokeWidth={2.5} aria-hidden="true" />
          )}
          <ChevronDown
            className={`w-4.5 h-4.5 transition-transform duration-300 ${isOpen ? "rotate-180 text-primary" : "text-gray-400 dark:text-gray-400"}`}
            strokeWidth={2}
            aria-hidden="true"
          />
        </div>
      </button>

      {/* Inline Error Message */}
      {showError && (
        <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
          <AlertCircle className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />
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
                       bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-slate-700 shadow-2xl overflow-hidden p-1.5"
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
                                    ? "bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white"
                                    : "text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700"
                                }`}
                  >
                    <span className="truncate">{option}</span>
                    {isSelected && (
                      <Check className="w-4 h-4 text-primary flex-shrink-0 ml-2" strokeWidth={2.5} aria-hidden="true" />
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
