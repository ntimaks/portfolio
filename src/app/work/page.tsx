import { Card, PageHeader, RuledDivider } from "@/components/primitives";
import { workEntries } from "@/lib/content";

export const metadata = { title: "Work // NIKOLASS" };

export default function WorkPage() {
  return (
    <div className="max-w-[1080px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <PageHeader code="WK.01" title="Work" meta={`${workEntries.length} positions`} accent="pink" />
      <RuledDivider pattern="slash" />
      <div className="grid md:grid-cols-2 gap-4 sm:gap-5">
        {workEntries.map((w, i) => (
          <a key={w.company} href={w.url} target="_blank" rel="noreferrer" className="no-underline group block">
            <Card stamp open accent={i === 0 ? "pink" : "default"} code={`VOL.${String(i + 1).padStart(2, "0")}`} label={w.role.toUpperCase()}>
              <div className="font-mono font-bold text-[20px] sm:text-[22px] leading-tight group-hover:text-cobalt transition-colors">{w.company} ↗</div>
              <div className="text-[11px] text-ink-3 mt-1 tracking-widest uppercase">{w.period}</div>
              <p className="font-serif italic text-[16px] mt-3 leading-snug text-ink-2">{w.blurb}</p>
              {w.stack && (
                <div className="flex flex-wrap gap-2 mt-4 border-t border-dotted border-ink-5 pt-3">
                  {w.stack.map((s) => (
                    <span key={s} className="text-[10px] uppercase tracking-widest text-ink-3">[{s}]</span>
                  ))}
                </div>
              )}
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
}
