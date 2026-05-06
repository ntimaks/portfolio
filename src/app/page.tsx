import { Card, Hi, RuledDivider, StampButton, TechMarker } from "@/components/primitives";
import { siteConfig } from "@/lib/site-config";
import { NowPlayingCard } from "@/components/music/NowPlayingCard";

export default function Home() {
  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 pb-10">
      {/* Hero */}
      <section className="pt-8 sm:pt-12 pb-12 sm:pb-16">
        <div className="flex items-center gap-3 mb-4 font-pixel text-[16px] tracking-[0.05em] text-ink-3 flex-wrap leading-none">
          <span>[VOL.01]</span>
          <span>{"//"}</span>
          <span>2026.05</span>
          <span className="flex-1 border-t border-ink-0 min-w-[40px]" />
          <span>FILED · {siteConfig.name}</span>
        </div>
        <h1 className="font-display font-bold uppercase tracking-tight leading-[0.9] text-[56px] sm:text-[96px] md:text-[128px] xl:text-[144px]">
          NIKOLASS<span className="text-vermillion">.</span>
        </h1>
        <p className="font-serif italic text-[20px] sm:text-[24px] text-ink-2 mt-3 leading-snug">
          things I&apos;ve made, kept, and dated.
        </p>
        <p className="mt-6 max-w-xl text-[15px] leading-relaxed">
          {siteConfig.bio} <Hi>a logbook, not a marketing site.</Hi>
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {siteConfig.socials.map((s) => (
            <a key={s.code} href={s.url} target="_blank" rel="noreferrer" className="no-underline">
              <TechMarker>{s.code}</TechMarker>
            </a>
          ))}
        </div>
      </section>

      <RuledDivider label="MUSIC" pattern="dot" />

      <section className="grid md:grid-cols-3 gap-4 sm:gap-6">
        <NowPlayingCard className="md:col-span-2 h-fit" />
        <Card stamp code="PL" label="PLAYLISTS // CURATED" open>
          <ul className="space-y-2">
            {siteConfig.playlists.map((p) => (
              <li key={p.code} className="flex items-baseline gap-3 border-b border-dotted border-ink-5 pb-2">
                <span className="text-[10px] tracking-widest text-ink-3 shrink-0">[{p.code}]</span>
                <a href={p.url} className="text-[13px] no-underline hover:text-cobalt transition-colors" target="_blank" rel="noreferrer">{p.title}</a>
              </li>
            ))}
          </ul>
          <a href={siteConfig.appleMusicProfileUrl} target="_blank" rel="noreferrer" className="block mt-4 no-underline">
            <StampButton variant="primary" className="w-full">→ Apple Music profile</StampButton>
          </a>
        </Card>
      </section>
    </div>
  );
}
