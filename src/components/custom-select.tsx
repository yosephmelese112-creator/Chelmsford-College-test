"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icon";

export interface SelectOption {
  value: string;
  label: string;
}

export function CustomSelect({
  id,
  name,
  value,
  onChange,
  options,
  placeholder = "Select an option",
  disabled = false,
  className = "",
  "aria-label": ariaLabel,
}: {
  id?: string;
  name?: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  "aria-label"?: string;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    if (!open) return;

    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const selectedOption = options.find((opt) => opt.value === value);
  const displayLabel = selectedOption ? selectedOption.label : placeholder;

  // WCAG 2.5.3 (Label in Name): spoken accessible name MUST contain the visible text
  const computedAriaLabel = ariaLabel
    ? ariaLabel.toLowerCase().includes(displayLabel.toLowerCase())
      ? ariaLabel
      : `${ariaLabel}: ${displayLabel}`
    : displayLabel;

  return (
    <div
      ref={containerRef}
      className={`custom-select-container ${disabled ? "is-disabled" : ""} ${open ? "is-open" : ""} ${className}`}
    >
      {/* Hidden input to ensure standard form submission works */}
      {name && <input type="hidden" name={name} value={value} />}

      <button
        id={id}
        type="button"
        className="custom-select-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={computedAriaLabel}
        disabled={disabled}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (!disabled) setOpen((prev) => !prev);
        }}
      >
        <span className={`custom-select-value ${!selectedOption && !value ? "is-placeholder" : ""}`}>
          {displayLabel}
        </span>
        <span className="custom-select-chevron" aria-hidden="true">
          <Icon name="chevron" size={16} />
        </span>
      </button>

      {open && !disabled && (
        <ul
          className="custom-select-dropdown"
          role="listbox"
          aria-label={computedAriaLabel}
        >
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <li
                key={option.value || "__empty"}
                role="option"
                aria-selected={isSelected}
                className={`custom-select-option ${isSelected ? "is-selected" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onChange(option.value);
                  setOpen(false);
                }}
              >
                <span>{option.label}</span>
                {isSelected && (
                  <span className="custom-select-check" aria-hidden="true">
                    <Icon name="check" size={16} />
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
