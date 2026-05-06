import Link from "next/link";
import { Card, MetaStrip, RuledDivider, StampButton, TechMarker } from "@/components/primitives";
import { siteConfig } from "@/lib/site-config";
import { sideProjects, workEntries } from "@/lib/content";
import { NowPlayingCard } from "@/components/music/NowPlayingCard";

export default function Home() {
  return (
    <div className="max-w-[1280px] mx-auto px-6">
      {/* Hero */}
      <section className="pt-10 pb-16">
        <div className="flex items-center gap-3 mb-4 text-[10px] tracking-[0.2em] uppercase text-ink-3">
          <span>[VOL.01]</span>
          <span>//</span>
          <span>2026.05</span>
          <span className="flex-1 border-t border-ink-0" />
          <span>FILED UNDER · {siteConfig.name}</span>
        </div>
        <h1 className="font-display font-bold uppercase tracking-tight leading-[0.9] text-[64px] sm:text-[112px] md:text-[144px]">
          NIKOLASS<span className="text-ink-3">.</span>
        </h1>
        <p className="mt-6 max-w-xl text-[15px] leading-relaxed">
          {siteConfig.bio} <span className="bg-acid">a logbook, not a marketing site.</span>
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {siteConfig.socials.map((s) => (
            <a key={s.code} href={s.url} target="_blank" rel="noreferrer">
              <TechMarker>{s.code}</TechMarker>
            </a>
          ))}
        </div>
      </section>

      <RuledDivider label="META" pattern="slash" />

      {/* Meta strip */}
      <MetaStrip
        cells={[
          { lbl: "ROLE", val: "engineer", sub: "ind. side-work" },
          { lbl: "BASED", val: `${siteConfig.location.city}, ${siteConfig.location.country}`, sub: siteConfig.location.tz },
          { lbl: "STATUS", val: "available", sub: "selectively", live: true },
          { lbl: "STACK", val: "TS · RUST · PY", sub: "+ blender" },
          { lbl: "LAST LOG", val: "2026.05.06", sub: "// rewiring" },
        ]}
      />

      <RuledDivider label="MUSIC" pattern="dot" />

      <section className="grid md:grid-cols-3 gap-6">
        <NowPlayingCard className="md:col-span-2" />
        <Card code="PL" label="PLAYLISTS // CURATED">
          <ul className="space-y-2">
            {siteConfig.playlists.map((p) => (
              <li key={p.code} className="flex items-baseline gap-3 border-b border-dotted border-ink-5 pb-2">
                <span className="text-[10px] tracking-widest text-ink-3 shrink-0">[{p.code}]</span>
                <a href={p.url} className="text-[13px]" target="_blank" rel="noreferrer">{p.title}</a>
              </li>
            ))}
          </ul>
          <a href={siteConfig.appleMusicProfileUrl} target="_blank" rel="noreferrer" className="block mt-4 no-underline">
            <StampButton variant="primary" className="w-full">→ Apple Music profile</StampButton>
          </a>
        </Card>
      </section>

      <RuledDivider label="CATALOGUE" pattern="eq" />

      {/* Side projects index */}
      <section>
        <div className="flex items-end justify-between mb-4">
          <h2 className="font-mono font-bold text-[22px] uppercase tracking-tight">Side projects</h2>
          <Link href="/projects" className="text-[11px] tracking-widest uppercase">[ index → ]</Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sideProjects.slice(0, 4).map((p, i) => (
            <Link key={p.slug} href={`/projects/${p.slug}`} className="group no-underline" >
              <Card code={`${String(i + 1).padStart(2, "0")}`} label={`ENTRY · ${p.type.toUpperCase()}`} stamp>
                <div className="aspect-[4/3] bg-ink-0 text-paper-0 font-pixel text-[18px] flex items-center justify-center mb-3 relative overflow-hidden">
                  <span className="opacity-60">▓▓░░ {p.type.toUpperCase()} ░░▓▓</span>
                  <div className="scan-line" />
                </div>
                <div className="font-mono font-bold text-[14px] leading-tight group-hover:text-cobalt transition-colors">
                  {p.title}
                </div>
                <div className="text-[11px] text-ink-2 mt-1">{p.blurb}</div>
                <div className="text-[10px] text-ink-3 mt-3 flex gap-3 border-t border-dotted border-ink-5 pt-2">
                  <span>{p.date}</span>
                  <span>· {p.tags?.[0]}</span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <RuledDivider label="WORK" pattern="slash" />

      {/* Work experience */}
      <section className="pb-16">
        <div className="flex items-end justify-between mb-4">
          <h2 className="font-mono font-bold text-[22px] uppercase tracking-tight">Work</h2>
          <Link href="/work" className="text-[11px] tracking-widest uppercase">[ all → ]</Link>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {workEntries.map((w, i) => (
            <a key={w.company} href={w.url} target="_blank" rel="noreferrer" className="no-underline">
              <Card code={`VOL.${String(i + 1).padStart(2, "0")}`} label={w.role.toUpperCase()} stamp>
                <div className="font-mono font-bold text-[18px] leading-tight">{w.company} ↗</div>
                <div className="text-[11px] text-ink-3 mt-1 tracking-widest uppercase">{w.period}</div>
                <p className="text-[13px] mt-2">{w.blurb}</p>
                {w.stack && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {w.stack.map((s) => (
                      <span key={s} className="text-[10px] uppercase tracking-widest text-ink-3">· {s}</span>
                    ))}
                  </div>
                )}
              </Card>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
