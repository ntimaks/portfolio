import { Card, MetaStrip, PageHeader, RuledDivider } from "@/components/primitives";
import { NowPlayingCard } from "@/components/music/NowPlayingCard";
import { siteConfig } from "@/lib/site-config";
import { sideProjects } from "@/lib/content";

export const metadata = { title: "Control Panel // NIKOLASS" };

export default function ControlPanelPage() {
  return (
    <div className="max-w-[1280px] mx-auto px-6">
      <PageHeader code="PNL.04" title="Control Panel" meta="all systems · nominal" />
      <MetaStrip
        cells={[
          { lbl: "OPERATOR", val: siteConfig.name },
          { lbl: "LOCATION", val: `${siteConfig.location.city}, ${siteConfig.location.country}` },
          { lbl: "TZ", val: siteConfig.location.tz },
          { lbl: "UPLINK", val: "OK", live: true },
          { lbl: "VOL", val: "01" },
        ]}
      />
      <RuledDivider label="TELEMETRY" pattern="dot" />
      <div className="grid md:grid-cols-3 gap-5">
        <NowPlayingCard className="md:col-span-2" />
        <Card stamp code="LOG" label="RECENT ENTRIES">
          <ul className="space-y-1.5 text-[13px] font-mono">
            {sideProjects.slice(0, 4).map((p, i) => (
              <li key={p.slug} className="flex gap-2 border-b border-dotted border-ink-5 pb-1">
                <span className="text-ink-3 text-[11px] w-12 shrink-0">{p.date.slice(2)}</span>
                <span className="truncate">{p.title}</span>
              </li>
            )).concat()}
          </ul>
        </Card>

        <Card code="SYS" label="SYSTEM // FAUX">
          <div className="font-pixel text-[18px] leading-snug text-ink-2 space-y-1">
            <div>boot ........ <span className="text-kelly">ok</span></div>
            <div>net ......... <span className="text-kelly">ok</span></div>
            <div>cron ........ <span className="text-amber">idle</span></div>
            <div>cache ....... <span className="text-kelly">warm</span></div>
            <div>uptime ...... 12h 41m</div>
          </div>
        </Card>

        <Card stamp code="WX" label="WEATHER · MOCK" className="md:col-span-2">
          <div className="grid grid-cols-5">
            {[0,1,2,3,4].map((d) => (
              <div key={d} className="px-2 py-1 border-r last:border-r-0 border-dotted border-ink-5">
                <div className="text-[10px] tracking-widest uppercase text-ink-3">D+{d}</div>
                <div className="font-mono text-[13px]">clear</div>
                <div className="text-[10px] text-ink-3">↘ 9°  ↗ 14°</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
