import { Card, MetaStrip, PageHeader, RuledDivider, StampButton, TechMarker, TerminalStrip } from "@/components/primitives";

export const metadata = { title: "Design // NIKOLASS" };

export default function DesignPage() {
  return (
    <div className="max-w-[1280px] mx-auto px-6 pb-16">
      <PageHeader code="DS.00" title="Design system" meta="tokens · components · contracts" />
      <p className="max-w-2xl text-[14px] text-ink-2 mb-8">
        the system is monospace-first, paper/ink monochrome, with one acid accent. square corners, hard 1px borders, stamp shadows. no emoji.
      </p>

      <RuledDivider label="COLOR" pattern="slash" />
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 mb-6">
        {["paper-0","paper-1","paper-2","paper-3","ink-5","ink-3","ink-1","ink-0"].map((c) => (
          <div key={c} className="border border-ink-0">
            <div className="h-16" style={{ background: `var(--${c})` }} />
            <div className="p-1.5 text-[10px] tracking-widest uppercase">{c}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-10">
        {["acid","cobalt","vermillion","kelly"].map((c) => (
          <div key={c} className="border border-ink-0">
            <div className="h-16" style={{ background: `var(--${c})` }} />
            <div className="p-1.5 text-[10px] tracking-widest uppercase">{c}</div>
          </div>
        ))}
      </div>

      <RuledDivider label="TYPE" pattern="dot" />
      <div className="space-y-3 mb-10">
        <div className="font-display font-bold uppercase text-[96px] leading-none tracking-tight">DISPLAY · 96</div>
        <div className="font-mono font-bold text-[28px] leading-tight">H2 · jetbrains mono · 28</div>
        <div className="font-mono text-[15px]">body · jetbrains mono · 15 — i keep notes.</div>
        <div className="text-[10px] tracking-widest uppercase text-ink-3">META · 10 · 0.2EM TRACKING</div>
        <div className="font-pixel text-[22px] text-term-fg bg-term-bg px-2 py-1 inline-block">VT323 // PIXEL</div>
        <div className="font-serif italic text-[28px]">DM Serif · editorial only</div>
      </div>

      <RuledDivider label="COMPONENTS" pattern="eq" />

      <h3 className="font-mono font-bold text-[18px] mb-3">Buttons · stamp behavior</h3>
      <div className="flex gap-3 flex-wrap mb-8">
        <StampButton variant="primary">[ENTER]</StampButton>
        <StampButton variant="secondary">secondary</StampButton>
        <StampButton variant="acid">+ NEW ENTRY</StampButton>
        <StampButton variant="ghost">cancel ×</StampButton>
        <StampButton disabled>disabled</StampButton>
      </div>

      <h3 className="font-mono font-bold text-[18px] mb-3">Markers</h3>
      <div className="flex gap-2 flex-wrap mb-8">
        <TechMarker>VOL.02</TechMarker>
        <TechMarker>FL33</TechMarker>
        <TechMarker acid>ACID</TechMarker>
        <TechMarker>2026.05</TechMarker>
      </div>

      <h3 className="font-mono font-bold text-[18px] mb-3">Card</h3>
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <Card stamp code="CMP.04" label="ENTRY · LOG">
          <div className="font-mono font-bold text-[15px]">Rewiring the studio. Day 2.</div>
          <div className="text-[12px] text-ink-2">Ground loop traced to the input strip.</div>
          <div className="text-[10px] text-ink-3 mt-2 border-t border-dotted border-ink-5 pt-1.5">25.09.28 · short · 013</div>
        </Card>
        <Card code="CMP.05" label="ENTRY · NOTE">
          <div className="font-mono font-bold text-[15px]">Where Is the Friend&apos;s House?</div>
          <div className="text-[12px] text-ink-2">Kiarostami, 1987. Notes from second viewing.</div>
        </Card>
      </div>

      <h3 className="font-mono font-bold text-[18px] mb-3">Meta strip</h3>
      <MetaStrip
        cells={[
          { lbl: "06.10.25", val: "Ciel dégagé", sub: "↘10.4° ↗13.6°" },
          { lbl: "07.10.25", val: "Ciel dégagé", sub: "↘9.6° ↗12.0°" },
          { lbl: "08.10.25", val: "Ciel dégagé", sub: "↘8.8° ↗10.4°" },
          { lbl: "09.10.25", val: "Nuages",       sub: "↘9.2° ↗10.0°" },
          { lbl: "10.10.25", val: "Pluie",        sub: "↘7.4° ↗9.4°", live: true },
        ]}
      />

      <h3 className="font-mono font-bold text-[18px] mt-8 mb-3">Terminal strip</h3>
      <TerminalStrip live>
        <span className="text-term-dim">[NOW]</span>
        <span>♪ Stuck on Repeat — Little Boots</span>
        <span className="text-term-dim">//</span>
        <span className="text-term-amber">[BUILD]</span>
        <span>a3f9c1</span>
        <span className="caret text-acid">█</span>
      </TerminalStrip>
    </div>
  );
}
