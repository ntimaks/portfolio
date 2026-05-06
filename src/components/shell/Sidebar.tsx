"use client";
import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sectionFor, type SidebarEntry } from "@/lib/sidebar-entries";

export function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const section = sectionFor(pathname);
  // Tag filter scoped to current pathname; auto-resets on route change without an effect.
  const [tagState, setTagState] = React.useState<{ pathname: string; tag: string | null }>(
    { pathname, tag: null },
  );
  const activeTag = tagState.pathname === pathname ? tagState.tag : null;
  const setActiveTag = (t: string | null) => setTagState({ pathname, tag: t });

  // Close mobile drawer when pathname changes.
  const lastPathRef = React.useRef(pathname);
  React.useEffect(() => {
    if (lastPathRef.current !== pathname) {
      lastPathRef.current = pathname;
      onClose();
    }
  }, [pathname, onClose]);

  const entries = activeTag
    ? section.entries.filter((e) => e.tags?.includes(activeTag))
    : section.entries;

  return (
    <>
      {/* Mobile overlay */}
      <div
        onClick={onClose}
        className={`lg:hidden fixed inset-0 z-30 bg-ink-0/60 transition-opacity duration-[180ms] ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden
      />
      <aside
        className={`fixed lg:static top-0 left-0 z-40 lg:z-auto h-screen lg:h-auto w-[280px] lg:w-auto border-r border-ink-0 bg-paper-0 flex flex-col transition-transform duration-[180ms] ease-linear lg:transition-none ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
        aria-label="Sidebar navigation"
      >
        <div className="px-3 py-2 text-[9px] tracking-[0.25em] uppercase text-ink-3 border-b border-ink-0 bg-paper-1 flex items-center justify-between">
          <span className="truncate">{section.label}</span>
          <span className="text-ink-4">{entries.length}</span>
        </div>
        <div className="flex-1 overflow-y-auto">
          {entries.map((e) => (
            <SidebarItem key={e.id} entry={e} pathname={pathname} />
          ))}
          {entries.length === 0 && (
            <div className="px-3 py-6 text-[11px] text-ink-3 text-center">
              [ no entries match {activeTag ? `· ${activeTag}` : "" } ]
            </div>
          )}
        </div>
        {section.tags.length > 0 && (
          <div className="border-t border-ink-0 p-2 flex flex-wrap gap-1 bg-paper-1">
            {section.tags.map((t) => {
              const on = activeTag === t;
              return (
                <button
                  key={t}
                  onClick={() => setActiveTag(on ? null : t)}
                  className={`font-mono text-[9px] tracking-[0.15em] uppercase px-1.5 py-0.5 border border-ink-0 cursor-pointer transition-colors duration-[120ms] ${
                    on ? "bg-ink-0 text-paper-0" : "bg-transparent text-ink-0 hover:bg-paper-2"
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
        )}
      </aside>
    </>
  );
}

function SidebarItem({ entry, pathname }: { entry: SidebarEntry; pathname: string }) {
  const active = entry.href === pathname || (entry.href !== "/" && pathname.startsWith(entry.href + "/"));
  const isAnchor = entry.href.startsWith("#");
  const cls = `grid grid-cols-[36px_1fr_auto] gap-2 px-3 py-2.5 border-b border-dotted border-ink-5 no-underline transition-colors duration-[120ms] ${
    active ? "bg-acid text-on-acid" : "text-ink-0 hover:bg-paper-1"
  }`;
  const inner = (
    <>
      <div
        className="w-9 h-9 border border-ink-0 self-center"
        style={{
          backgroundColor: "var(--ink-0)",
          backgroundImage:
            "radial-gradient(circle at 30% 40%, var(--paper-0) 1px, transparent 1.5px), radial-gradient(circle at 70% 60%, var(--paper-0) 1px, transparent 1.5px)",
          backgroundSize: "4px 4px, 6px 6px",
        }}
      />
      <div className="min-w-0">
        {entry.date && <div className="font-pixel text-[14px] text-ink-3 tracking-[0.05em] leading-none">{entry.date}</div>}
        <div className="text-[12px] font-bold leading-tight truncate">{entry.title}</div>
        <div className="font-pixel text-[14px] tracking-normal text-ink-3 truncate leading-none mt-px">{entry.kind}</div>
      </div>
      {entry.meta && (
        <div className="font-pixel text-[14px] self-center text-ink-3 leading-none">[{entry.meta}]</div>
      )}
    </>
  );
  return isAnchor ? (
    <a href={entry.href} className={cls}>{inner}</a>
  ) : (
    <Link href={entry.href} className={cls}>{inner}</Link>
  );
}
