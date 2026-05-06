"use client";
import * as React from "react";
import { useBlockCaret } from "./useBlockCaret";

// ── Input ───────────────────────────────────────────────────────────
// Hides native caret, renders animated block █ at selectionStart.
// Focus state: paper-1 bg + 3px acid ring.
export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { error?: boolean }
>(function Input({ className = "", error = false, style, onFocus, onBlur, ...rest }, externalRef) {
  const { inputRef, caretRef } = useBlockCaret();
  const [focused, setFocused] = React.useState(false);

  const setRef = (el: HTMLInputElement | null) => {
    inputRef.current = el;
    if (typeof externalRef === "function") externalRef(el);
    else if (externalRef) (externalRef as React.MutableRefObject<HTMLInputElement | null>).current = el;
  };

  const ringStyle = error ? "focus:shadow-[var(--ring-focus-red)]" : "focus:shadow-[var(--ring-focus)]";
  const borderColor = error ? "border-term-red" : "border-ink-0";

  return (
    <span className="relative block">
      <input
        ref={setRef}
        onFocus={(e) => { setFocused(true); onFocus?.(e); }}
        onBlur={(e) => { setFocused(false); onBlur?.(e); }}
        className={`block w-full font-mono text-[13px] px-2.5 py-2 border ${borderColor} bg-paper-0 text-ink-0 outline-none focus:bg-paper-1 ${ringStyle} transition-shadow duration-[120ms] ${className}`}
        style={{ caretColor: "transparent", ...style }}
        {...rest}
      />
      <span
        ref={caretRef}
        aria-hidden
        className="caret pointer-events-none absolute top-1/2 -translate-y-1/2"
        style={{
          width: "8px",
          height: "14px",
          background: "var(--ink-0)",
          left: "0px",
          display: focused ? "block" : "none",
        }}
      />
    </span>
  );
});

// ── Textarea ────────────────────────────────────────────────────────
// Multi-line: native caret styled as acid (block caret across lines is
// expensive and brittle). Same focus ring as Input.
export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: boolean }
>(function Textarea({ className = "", error = false, style, ...rest }, ref) {
  const ringStyle = error ? "focus:shadow-[var(--ring-focus-red)]" : "focus:shadow-[var(--ring-focus)]";
  const borderColor = error ? "border-term-red" : "border-ink-0";
  return (
    <textarea
      ref={ref}
      className={`block w-full font-mono text-[13px] px-2.5 py-2 border ${borderColor} bg-paper-0 text-ink-0 outline-none focus:bg-paper-1 ${ringStyle} transition-shadow duration-[120ms] resize-y ${className}`}
      style={{ caretColor: "var(--acid)", caretShape: "block", ...style } as React.CSSProperties}
      {...rest}
    />
  );
});

// ── Field (label + input + helper + error) ──────────────────────────
export function Field({
  label,
  required = false,
  error,
  helper,
  count,
  max,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  helper?: string;
  count?: number;
  max?: number;
  children: React.ReactNode;
}) {
  const hasError = !!error;
  return (
    <div className="block">
      <div className={`flex items-center justify-between text-[9px] tracking-[0.2em] uppercase mb-1 ${hasError ? "text-term-red" : "text-ink-3"}`}>
        <span>
          {label}
          {required && <span className="ml-1.5 opacity-70">[REQ]</span>}
        </span>
        {(count != null && max != null) && (
          <span>{count} / {max}</span>
        )}
      </div>
      {children}
      {(helper || error) && (
        <div className={`mt-1 text-[10px] flex justify-between gap-3 ${hasError ? "text-term-red" : "text-ink-3"}`}>
          <span>{hasError ? `→ ${error}` : helper}</span>
          {!hasError && count != null && max != null && <span>{count} / {max}</span>}
        </div>
      )}
    </div>
  );
}

// ── Select (custom listbox) ─────────────────────────────────────────
type Option = { value: string; label: string };
export function Select({
  value,
  onChange,
  options,
  placeholder = "—",
  className = "",
  ariaLabel,
}: {
  value: string;
  onChange: (v: string) => void;
  options: Option[];
  placeholder?: string;
  className?: string;
  ariaLabel?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [hi, setHi] = React.useState(0);
  const ref = React.useRef<HTMLDivElement | null>(null);
  const listboxId = React.useId();
  const current = options.find((o) => o.value === value);

  React.useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      else if (e.key === "ArrowDown") { e.preventDefault(); setHi((i) => Math.min(options.length - 1, i + 1)); }
      else if (e.key === "ArrowUp")   { e.preventDefault(); setHi((i) => Math.max(0, i - 1)); }
      else if (e.key === "Enter")     { e.preventDefault(); const o = options[hi]; if (o) { onChange(o.value); setOpen(false); } }
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, hi, options, onChange]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        aria-label={ariaLabel}
        onClick={() => setOpen((o) => !o)}
        className="w-full font-mono text-[13px] px-2.5 py-2 border border-ink-0 bg-paper-0 text-ink-0 text-left outline-none focus:bg-paper-1 focus:shadow-[var(--ring-focus)] transition-shadow duration-[120ms] flex items-center justify-between gap-2"
      >
        <span className={current ? "" : "text-ink-4"}>{current?.label ?? placeholder}</span>
        <span className="text-ink-3 text-[10px]">▾</span>
      </button>
      {open && (
        <ul
          id={listboxId}
          role="listbox"
          className="absolute z-50 left-0 right-0 mt-px border border-ink-0 bg-paper-0 max-h-[240px] overflow-y-auto shadow-stamp"
        >
          {options.map((o, i) => (
            <li
              key={o.value}
              role="option"
              aria-selected={o.value === value}
              onMouseEnter={() => setHi(i)}
              onClick={() => { onChange(o.value); setOpen(false); }}
              className={`px-2.5 py-1.5 text-[13px] font-mono cursor-pointer ${
                i === hi ? "bg-acid text-on-acid" : "text-ink-0"
              }`}
            >
              {o.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ── Checkbox ────────────────────────────────────────────────────────
export function Checkbox({
  checked,
  onChange,
  label,
  className = "",
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`inline-flex items-center gap-2 cursor-pointer text-[12px] font-mono ${className}`}>
      <span
        role="checkbox"
        aria-checked={checked}
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); onChange(!checked); } }}
        onClick={() => onChange(!checked)}
        className={`inline-flex items-center justify-center w-[14px] h-[14px] border border-ink-0 ${checked ? "bg-ink-0 text-paper-0" : "bg-paper-0"}`}
      >
        {checked && <span className="text-[11px] leading-none">✕</span>}
      </span>
      {label}
    </label>
  );
}

// ── Radio (group) ───────────────────────────────────────────────────
export function Radio<T extends string>({
  value,
  onChange,
  options,
  className = "",
}: {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: React.ReactNode }[];
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {options.map((o) => {
        const on = value === o.value;
        return (
          <label key={o.value} className="inline-flex items-center gap-2 cursor-pointer text-[12px] font-mono">
            <span
              role="radio"
              aria-checked={on}
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); onChange(o.value); } }}
              onClick={() => onChange(o.value)}
              className={`inline-flex items-center justify-center w-[14px] h-[14px] border border-ink-0 ${on ? "bg-ink-0" : "bg-paper-0"}`}
            >
              {on && <span className="block w-[6px] h-[6px] bg-paper-0" />}
            </span>
            {o.label}
          </label>
        );
      })}
    </div>
  );
}
