import * as React from "react";

type DivProps = React.HTMLAttributes<HTMLDivElement>;
type Tone = "default" | "acid" | "cobalt" | "pink" | "kelly";

// ── Card ─────────────────────────────────────────────────────────────
export function Card({
  code,
  label,
  stamp = false,
  hover = true,
  open = false,
  accent = "default",
  children,
  className = "",
  ...rest
}: DivProps & {
  code?: string;
  label?: string;
  stamp?: boolean;
  hover?: boolean;
  open?: boolean;
  accent?: Tone;
}) {
  const stampShadow = stamp
    ? accent === "cobalt"
      ? "shadow-stamp-cobalt"
      : accent === "pink"
      ? "shadow-stamp-pink"
      : accent === "kelly"
      ? "shadow-stamp-kelly"
      : "shadow-stamp"
    : "";
  const hoverFx = hover
    ? "transition-[transform,box-shadow] duration-[120ms] ease-linear hover:-translate-x-px hover:-translate-y-px hover:shadow-stamp-lg"
    : "";
  return (
    <div
      className={`group/card relative border border-ink-0 bg-paper-1 ${stampShadow} ${hoverFx} ${className}`}
      {...rest}
    >
      {(code || label) && (
        <div className="flex justify-between items-center px-2 py-1.5 bg-paper-2 border-b border-ink-0 text-[9px] tracking-[0.2em] uppercase text-ink-3">
          <span className="truncate">{label}</span>
          <span className="flex items-center gap-2 shrink-0">
            {open && (
              <span className="opacity-0 group-hover/card:opacity-100 transition-opacity duration-[120ms] bg-acid text-on-acid border border-ink-0 px-1.5 py-[1px] text-[9px] font-bold tracking-[0.15em] leading-none">
                OPEN ▸
              </span>
            )}
            {code && <span className="text-ink-0">[{code}]</span>}
          </span>
        </div>
      )}
      <div className="p-3">{children}</div>
    </div>
  );
}

// ── TechMarker ───────────────────────────────────────────────────────
const TONE_BG: Record<Tone, string> = {
  default: "bg-paper-1 text-ink-0",
  acid:    "bg-acid text-on-acid",
  cobalt:  "bg-cobalt text-on-cobalt",
  pink:    "bg-vermillion text-on-pink",
  kelly:   "bg-kelly text-on-kelly",
};

export function TechMarker({
  children,
  tone = "default",
  acid,
  as: As = "span",
  className = "",
}: {
  children: React.ReactNode;
  tone?: Tone;
  /** @deprecated use tone="acid" */ acid?: boolean;
  as?: React.ElementType;
  className?: string;
}) {
  const t: Tone = acid ? "acid" : tone;
  return (
    <As
      className={`inline-block border border-ink-0 px-1.5 py-[1px] text-[10px] tracking-[0.12em] uppercase font-mono ${TONE_BG[t]} ${className}`}
    >
      [{children}]
    </As>
  );
}

// ── StampButton ──────────────────────────────────────────────────────
export function StampButton({
  variant = "primary",
  className = "",
  children,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "acid" | "cobalt" | "pink" | "kelly" | "ghost";
}) {
  const styles =
    variant === "primary"
      ? "bg-ink-0 text-paper-0 border-ink-0 shadow-stamp"
      : variant === "acid"
      ? "bg-acid text-on-acid border-ink-0 font-bold shadow-stamp"
      : variant === "cobalt"
      ? "bg-cobalt text-on-cobalt border-ink-0 font-bold shadow-stamp-cobalt"
      : variant === "pink"
      ? "bg-vermillion text-on-pink border-ink-0 font-bold shadow-stamp-pink"
      : variant === "kelly"
      ? "bg-kelly text-on-kelly border-ink-0 font-bold shadow-stamp-kelly"
      : variant === "ghost"
      ? "bg-transparent text-ink-0 border-transparent border-dashed hover:border-ink-0"
      : "bg-paper-1 text-ink-0 border-ink-0 shadow-stamp";
  const motion =
    variant === "ghost"
      ? "transition-colors duration-[120ms] ease-linear"
      : "transition-[transform,box-shadow] duration-[120ms] ease-linear hover:-translate-x-px hover:-translate-y-px hover:shadow-stamp-lg active:translate-x-[2px] active:translate-y-[2px] active:shadow-none";
  return (
    <button
      className={`inline-flex items-center justify-center gap-1.5 font-mono uppercase tracking-[0.1em] text-[12px] px-4 py-2 border cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:active:translate-x-0 disabled:active:translate-y-0 ${motion} ${styles} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

// ── MetaStrip ────────────────────────────────────────────────────────
export function MetaStrip({
  cells,
  className = "",
  compact = false,
}: {
  cells: { lbl: string; val: string; sub?: string; live?: boolean }[];
  className?: string;
  compact?: boolean;
}) {
  return (
    <div
      className={`border border-ink-0 grid bg-paper-1 ${className}`}
      style={{ gridTemplateColumns: `repeat(${cells.length}, minmax(0, 1fr))` }}
    >
      {cells.map((c, i) => (
        <div
          key={i}
          className={`group/cell ${compact ? "px-2 py-1" : "px-2.5 py-2"} ${
            i < cells.length - 1 ? "border-r border-ink-0" : ""
          } transition-colors duration-[120ms] hover:bg-paper-0 hover:shadow-[inset_2px_0_0_0_var(--cobalt)]`}
        >
          <div className="text-[9px] tracking-[0.2em] uppercase text-ink-3 group-hover/cell:text-cobalt flex items-center gap-1.5 truncate">
            {c.lbl}
            {c.live && <span className="inline-block w-1.5 h-1.5 rounded-full bg-kelly caret shrink-0" />}
          </div>
          <div className={`font-mono ${compact ? "text-[11px]" : "text-[13px]"} text-ink-0 group-hover/cell:text-cobalt mt-0.5 truncate`}>
            {c.val}
          </div>
          {c.sub && <div className="text-[10px] text-ink-3 truncate">{c.sub}</div>}
        </div>
      ))}
    </div>
  );
}

// ── RuledDivider ─────────────────────────────────────────────────────
export function RuledDivider({
  label,
  pattern = "slash",
  className = "",
}: {
  label?: string;
  pattern?: "slash" | "dot" | "eq";
  className?: string;
}) {
  const ascii =
    pattern === "slash"
      ? " / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / "
      : pattern === "dot"
      ? " ● ○ ● ○ ● ○ ● ○ ● ○ ● ○ ● ○ ● ○ ● ○ ● ○ ● ○ ● ○ ● ○ ● ○ ● ○ ● ○ ● ○ "
      : "═══════════════════════════════════════════════════════════════════════════════════";
  return (
    <div className={`flex items-center gap-3 my-6 text-ink-3 text-[10px] tracking-widest uppercase ${className}`}>
      {label && <span className="shrink-0">[{label}]</span>}
      <span className="flex-1 overflow-hidden whitespace-nowrap select-none">{ascii}{ascii}</span>
    </div>
  );
}

// ── TerminalStrip ────────────────────────────────────────────────────
export function TerminalStrip({ children, className = "", live = false, ...rest }: DivProps & { live?: boolean }) {
  return (
    <div
      className={`relative bg-term-bg text-term-fg font-pixel text-[18px] leading-none px-3 py-1.5 overflow-hidden border-t border-b border-ink-0 ${className}`}
      {...rest}
    >
      {live && <div className="scan-line" />}
      <div className="flex items-center gap-2">{children}</div>
    </div>
  );
}

// ── HalftoneImage ────────────────────────────────────────────────────
export function HalftoneImage({
  src,
  alt,
  className = "",
}: { src: string; alt: string; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={`halftone w-full h-full object-cover ${className}`}
    />
  );
}

// ── PageHeader ───────────────────────────────────────────────────────
const ACCENT_RULE: Record<Tone, string> = {
  default: "border-ink-0",
  acid:    "border-acid",
  cobalt:  "border-cobalt",
  pink:    "border-vermillion",
  kelly:   "border-kelly",
};
const ACCENT_TEXT: Record<Tone, string> = {
  default: "text-ink-0",
  acid:    "text-ink-0",
  cobalt:  "text-cobalt",
  pink:    "text-vermillion",
  kelly:   "text-kelly",
};

export function PageHeader({
  code,
  title,
  meta,
  accent = "default",
  crumbs,
}: {
  code: string;
  title: string;
  meta?: string;
  accent?: Tone;
  crumbs?: string[];
}) {
  return (
    <header className="mb-10 lg:mb-12">
      <div className="flex items-center gap-3 mb-3 text-[10px] tracking-[0.2em] uppercase text-ink-3 flex-wrap">
        <span className={`font-pixel text-[18px] tracking-normal leading-none ${ACCENT_TEXT[accent]}`}>[{code}]</span>
        {crumbs?.map((c) => (
          <span key={c}>· {c}</span>
        ))}
        <span className={`flex-1 border-t-2 ${ACCENT_RULE[accent]}`} />
        {meta && <span className="font-serif italic normal-case text-[14px] text-ink-3">{meta}</span>}
      </div>
      <h1 className="font-display font-bold uppercase tracking-tight text-[44px] sm:text-[64px] md:text-[96px] leading-[0.95]">
        {title}
      </h1>
    </header>
  );
}

// ── Hi (highlight) ───────────────────────────────────────────────────
/**
 * Safe lime/accent highlight wrapper. ALWAYS forces ink-0 text color
 * regardless of theme — never produces white-on-lime contrast bug.
 */
export function Hi({
  children,
  tone = "acid",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "acid" | "cobalt" | "pink" | "kelly";
  className?: string;
}) {
  const bg = `var(--${tone === "pink" ? "vermillion" : tone})`;
  // cobalt has dark bg → light text; all others have light/saturated bg → ink-0 text
  const fg = tone === "cobalt" ? "var(--paper-0)" : "#0C0C0C";
  return (
    <mark
      className={`font-bold px-[3px] py-[1px] ${className}`}
      style={{ background: bg, color: fg }}
    >
      {children}
    </mark>
  );
}
