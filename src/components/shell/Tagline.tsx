import { siteConfig } from "@/lib/site-config";

export function Tagline() {
  return (
    <div className="border-b border-ink-0 bg-paper-0 px-3 py-1.5 flex items-center gap-3 text-[10px] tracking-[0.2em] uppercase text-ink-3 overflow-hidden">
      <span className="shrink-0 font-pixel text-[16px] tracking-[0.05em] normal-case text-ink-2">
        [ {siteConfig.tagline} ]
      </span>
      <span className="font-serif italic normal-case text-[12px] text-ink-3 hidden md:inline shrink-0">
        — kept by hand, dated, indexed.
      </span>
      <span className="flex-1 border-t border-dotted border-ink-5" />
      <span className="hidden sm:inline shrink-0 font-pixel text-[14px] tracking-[0.1em]">
        FILED · {siteConfig.name} · VOL.01
      </span>
    </div>
  );
}
