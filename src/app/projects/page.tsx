import Link from "next/link";
import { Card, PageHeader, RuledDivider } from "@/components/primitives";
import { sideProjects } from "@/lib/content";

export const metadata = { title: "Projects // NIKOLASS" };

export default function ProjectsPage() {
  const grouped = sideProjects.reduce<Record<string, typeof sideProjects>>((acc, p) => {
    (acc[p.type] ??= []).push(p);
    return acc;
  }, {});
  return (
    <div className="max-w-[1280px] mx-auto px-6">
      <PageHeader code="CAT.01" title="Catalogue" meta={`${sideProjects.length} entries`} />
      {(["app", "poster", "render", "video"] as const).map((type) => {
        const items = grouped[type];
        if (!items?.length) return null;
        return (
          <section key={type} className="mb-12">
            <RuledDivider label={type.toUpperCase()} pattern="slash" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((p, i) => (
                <Link key={p.slug} href={`/projects/${p.slug}`} className="no-underline group">
                  <Card stamp code={String(i + 1).padStart(3, "0")} label={`ENTRY · ${p.type.toUpperCase()}`}>
                    <div className="aspect-[5/3] bg-ink-0 text-paper-0 font-pixel text-[16px] flex items-center justify-center mb-3 relative overflow-hidden">
                      <span className="opacity-60">▓▓░ {p.type.toUpperCase()} ░▓▓</span>
                      <div className="scan-line" />
                    </div>
                    <div className="font-mono font-bold text-[15px] leading-tight group-hover:text-cobalt">{p.title}</div>
                    <div className="text-[11px] text-ink-2 mt-1">{p.blurb}</div>
                    <div className="text-[10px] text-ink-3 mt-2 border-t border-dotted border-ink-5 pt-1.5 flex gap-3">
                      <span>{p.date}</span>
                      {p.tags?.map((t) => <span key={t}>· {t}</span>)}
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
