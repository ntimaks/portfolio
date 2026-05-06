import * as React from "react";

type DivProps = React.HTMLAttributes<HTMLDivElement>;

// ── Card ─────────────────────────────────────────────────────────────
export function Card({
  code,
  label,
  stamp = false,
  children,
  className = "",
  ...rest
}: DivProps & { code?: string; label?: string; stamp?: boolean }) {
  return (
    <div
      className={`border border-ink-0 bg-paper-1 ${stamp ? "shadow-stamp" : ""} ${className}`}
      {...rest}
    >
      {(code || label) && (
        <div className="flex justify-between items-center px-2 py-1.5 bg-paper-2 border-b border-ink-0 text-[9px] tracking-[0.2em] uppercase text-ink-3">
          <span>{label}</span>
          {code && <span className="text-ink-0">[{code}]</span>}
        </div>
      )}
      <div className="p-3">{children}</div>
    </div>
  );
}

// ── TechMarker ───────────────────────────────────────────────────────
export function TechMarker({
  children,
  acid = false,
  as: As = "span",
  className = "",
}: {
  children: React.ReactNode;
  acid?: boolean;
  as?: React.ElementType;
  className?: string;
}) {
  return (
    <As
      className={`inline-block border border-ink-0 px-1.5 py-[1px] text-[10px] tracking-[0.12em] uppercase font-mono ${
        acid ? "bg-acid text-ink-0" : "bg-paper-1 text-ink-0"
      } ${className}`}
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
  variant?: "primary" | "secondary" | "acid" | "ghost";
}) {
  const styles =
    variant === "primary"
      ? "bg-ink-0 text-paper-0 border-ink-0"
      : variant === "acid"
      ? "bg-acid text-ink-0 border-ink-0 font-bold shadow-stamp"
      : variant === "ghost"
      ? "bg-transparent text-ink-0 border-transparent"
      : "bg-paper-1 text-ink-0 border-ink-0";
  return (
    <button
      className={`font-mono uppercase tracking-[0.1em] text-[12px] px-4 py-2 border cursor-pointer transition-transform duration-[120ms] ease-linear hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[2px] active:translate-y-[2px] ${styles} ${className}`}
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
}: {
  cells: { lbl: string; val: string; sub?: string; live?: boolean }[];
  className?: string;
}) {
  return (
    <div
      className={`border border-ink-0 grid bg-paper-1 ${className}`}
      style={{ gridTemplateColumns: `repeat(${cells.length}, 1fr)` }}
    >
      {cells.map((c, i) => (
        <div
          key={i}
          className={`px-2.5 py-2 ${i < cells.length - 1 ? "border-r border-ink-0" : ""}`}
        >
          <div className="text-[9px] tracking-[0.2em] uppercase text-ink-3 flex items-center gap-1.5">
            {c.lbl}
            {c.live && <span className="inline-block w-1.5 h-1.5 rounded-full bg-kelly caret" />}
          </div>
          <div className="font-mono text-[13px] text-ink-0 mt-0.5">{c.val}</div>
          {c.sub && <div className="text-[10px] text-ink-3">{c.sub}</div>}
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
  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={src}
      alt={alt}
      className={`halftone w-full h-full object-cover ${className}`}
    />
  );
}

// ── PageHeader ───────────────────────────────────────────────────────
export function PageHeader({
  code,
  title,
  meta,
}: {
  code: string;
  title: string;
  meta?: string;
}) {
  return (
    <header className="mb-12">
      <div className="flex items-center gap-3 mb-3 text-[10px] tracking-[0.2em] uppercase text-ink-3">
        <span>[{code}]</span>
        <span className="flex-1 border-t border-ink-0" />
        {meta && <span>{meta}</span>}
      </div>
      <h1 className="font-display font-bold uppercase tracking-tight text-[64px] sm:text-[96px] leading-[0.95]">
        {title}
      </h1>
    </header>
  );
}
