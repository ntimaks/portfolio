import { notFound } from "next/navigation";
import Link from "next/link";
import { Card, MetaStrip, RuledDivider, TechMarker } from "@/components/primitives";
import { getSideProject, sideProjects } from "@/lib/content";

export function generateStaticParams() {
  return sideProjects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getSideProject(slug);
  if (!p) notFound();

  return (
    <article className="max-w-[1080px] mx-auto px-6 py-10">
      <div className="text-[10px] tracking-widest uppercase text-ink-3 mb-3 flex items-center gap-3">
        <Link href="/projects">[ ← catalogue ]</Link>
        <span className="flex-1 border-t border-ink-0" />
        <span>FILE · {slug}</span>
      </div>
      <h1 className="font-display font-bold uppercase leading-[0.95] tracking-tight text-[56px] sm:text-[88px]">
        {p.title}
      </h1>
      <p className="mt-3 max-w-2xl text-[15px] text-ink-2">{p.blurb}</p>
      <RuledDivider pattern="slash" />
      <MetaStrip
        cells={[
          { lbl: "TYPE", val: p.type },
          { lbl: "DATE", val: p.date },
          { lbl: "STATUS", val: "filed", live: true },
          { lbl: "TAGS", val: p.tags?.join(" · ") ?? "—" },
        ]}
      />
      <div className="mt-6 flex flex-wrap gap-2">
        {p.links?.map((l) => (
          <a key={l.url} href={l.url} target="_blank" rel="noreferrer">
            <TechMarker acid>{l.label.toUpperCase()} ↗</TechMarker>
          </a>
        ))}
      </div>
      <RuledDivider label="BODY" pattern="dot" />
      <Card stamp className="max-w-prose">
        <div className="prose-sm font-mono text-[14px] leading-relaxed">
          {p.body ?? `// no body filed yet. add one to /content for ${p.slug}.`}
        </div>
      </Card>
    </article>
  );
}
