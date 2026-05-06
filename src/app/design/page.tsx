"use client";
import { useState } from "react";
import { Card, Hi, MetaStrip, PageHeader, RuledDivider, StampButton, TechMarker, TerminalStrip } from "@/components/primitives";
import { Checkbox, Field, Input, Radio, Select, Textarea } from "@/components/primitives/Field";

export default function DesignPage() {
  const [sel, setSel] = useState("a");
  const [chk, setChk] = useState(true);
  const [rad, setRad] = useState<"low" | "med" | "high">("med");
  const [val, setVal] = useState("nikolass");

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 sm:py-12 pb-16">
      <PageHeader code="DS.00" title="Design system" meta="tokens · components · contracts" accent="acid" />
      <p className="max-w-2xl text-[14px] text-ink-2 mb-8">
        the system is monospace-first, paper/ink monochrome, with four bracket-named accents. square corners, hard 1px borders, stamp shadows. <Hi>no white text on lime.</Hi>
      </p>

      <RuledDivider label="COLOR" pattern="slash" />
      <a id="color" />
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

      <a id="roles" />
      <RuledDivider label="COLOR · ROLES" pattern="eq" />
      <Card stamp className="mb-10" code="DS.07" label="SEMANTIC COLOR USAGE">
        <div className="grid sm:grid-cols-2 gap-3 text-[12px]">
          {[
            { tone: "acid",       role: "live · active · NOW · you-are-here" },
            { tone: "cobalt",     role: "links · data · interactive hover" },
            { tone: "vermillion", role: "featured · hero · 1× per page" },
            { tone: "kelly",      role: "success · tags · supporting" },
          ].map((r) => (
            <div key={r.tone} className="flex items-center gap-3 border border-ink-0 p-2 bg-paper-0">
              <span className="w-6 h-6 border border-ink-0 shrink-0" style={{ background: `var(--${r.tone})` }} />
              <div className="font-mono">
                <div className="text-[11px] tracking-widest uppercase font-bold">{r.tone}</div>
                <div className="text-[11px] text-ink-3">{r.role}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 border border-term-red bg-term-red/10 p-2 text-[11px]">
          <span className="text-term-red font-bold">[★ RULE]</span>{" "}
          never put light/white text on lime. always <code className="text-[11px]">var(--ink-0)</code>. use <code className="text-[11px]">&lt;Hi&gt;</code> to highlight safely.
        </div>
      </Card>

      <a id="type" />
      <RuledDivider label="TYPE" pattern="dot" />
      <div className="space-y-3 mb-10">
        <div className="font-display font-bold uppercase text-[64px] sm:text-[96px] leading-none tracking-tight">DISPLAY · 96</div>
        <div className="font-mono font-bold text-[24px] sm:text-[28px] leading-tight">H2 · jetbrains mono · 28</div>
        <div className="font-mono text-[15px]">body · jetbrains mono · 15 — i keep notes.</div>
        <div className="text-[10px] tracking-widest uppercase text-ink-3">META · 10 · 0.2EM TRACKING</div>
        <div className="font-pixel text-[22px] text-term-fg bg-term-bg px-2 py-1 inline-block">VT323 // PIXEL</div>
        <div className="font-serif italic text-[24px] sm:text-[28px]">DM Serif · editorial only</div>
      </div>

      <a id="btns" />
      <RuledDivider label="BUTTONS" pattern="eq" />
      <div className="flex gap-3 flex-wrap mb-10">
        <StampButton variant="primary">[ENTER]</StampButton>
        <StampButton variant="secondary">secondary</StampButton>
        <StampButton variant="acid">+ NEW ENTRY</StampButton>
        <StampButton variant="cobalt">→ link</StampButton>
        <StampButton variant="pink">★ featured</StampButton>
        <StampButton variant="kelly">✓ saved</StampButton>
        <StampButton variant="ghost">cancel ×</StampButton>
        <StampButton disabled>disabled</StampButton>
      </div>

      <RuledDivider label="MARKERS" pattern="dot" />
      <div className="flex gap-2 flex-wrap mb-10">
        <TechMarker>VOL.02</TechMarker>
        <TechMarker tone="acid">ACID</TechMarker>
        <TechMarker tone="cobalt">COBALT</TechMarker>
        <TechMarker tone="pink">FEATURED</TechMarker>
        <TechMarker tone="kelly">SUCCESS</TechMarker>
      </div>

      <a id="fields" />
      <RuledDivider label="FIELDS" pattern="slash" />
      <Card stamp code="DS.03" label="FORM FIELDS · INPUT, FOCUS, ERROR" className="mb-10">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="NAME" required count={val.length} max={64} helper="block caret on focus">
            <Input value={val} onChange={(e) => setVal(e.target.value.slice(0, 64))} />
          </Field>
          <Field label="EMAIL" helper="3px acid focus ring">
            <Input type="email" defaultValue="hi@nikolass.dev" />
          </Field>
          <Field label="ARCHIVE CODE" error="invalid month segment · expected 01–12">
            <Input defaultValue="LOG-2025-13-84" error />
          </Field>
          <Field label="CATEGORY" helper="custom listbox">
            <Select
              value={sel}
              onChange={setSel}
              options={[
                { value: "a", label: "[ENTRY] / log" },
                { value: "b", label: "[ENTRY] / note" },
                { value: "c", label: "[ENTRY] / sketch" },
              ]}
            />
          </Field>
          <Field label="MESSAGE">
            <Textarea defaultValue="multi-line · acid caret color" rows={4} />
          </Field>
          <div className="flex flex-col gap-3 justify-center">
            <Checkbox checked={chk} onChange={setChk} label="acknowledge" />
            <Radio
              value={rad}
              onChange={setRad}
              options={[
                { value: "low", label: "low density" },
                { value: "med", label: "medium density" },
                { value: "high", label: "high density" },
              ]}
            />
          </div>
        </div>
      </Card>

      <a id="cards" />
      <RuledDivider label="CARDS" pattern="eq" />
      <div className="grid sm:grid-cols-2 gap-4 mb-10">
        <Card stamp open code="CMP.04" label="ENTRY · LOG">
          <div className="font-mono font-bold text-[15px]">Rewiring the studio. Day 2.</div>
          <div className="text-[12px] text-ink-2">Ground loop traced to the input strip.</div>
          <div className="text-[10px] text-ink-3 mt-2 border-t border-dotted border-ink-5 pt-1.5">25.09.28 · short · 013</div>
        </Card>
        <Card open code="CMP.05" label="ENTRY · NOTE" accent="cobalt">
          <div className="font-mono font-bold text-[15px]">Where Is the Friend&apos;s House?</div>
          <div className="text-[12px] text-ink-2">Kiarostami, 1987. Notes from second viewing.</div>
        </Card>
      </div>

      <RuledDivider label="META STRIP" pattern="dot" />
      <MetaStrip
        className="mb-10"
        cells={[
          { lbl: "06.10.25", val: "Ciel dégagé", sub: "↘10.4° ↗13.6°" },
          { lbl: "07.10.25", val: "Ciel dégagé", sub: "↘9.6° ↗12.0°" },
          { lbl: "08.10.25", val: "Ciel dégagé", sub: "↘8.8° ↗10.4°" },
          { lbl: "09.10.25", val: "Nuages",       sub: "↘9.2° ↗10.0°" },
          { lbl: "10.10.25", val: "Pluie",        sub: "↘7.4° ↗9.4°", live: true },
        ]}
      />

      <RuledDivider label="TERMINAL" pattern="slash" />
      <TerminalStrip live className="mb-10">
        <span className="text-term-dim">[NOW]</span>
        <span>♪ Stuck on Repeat — Little Boots</span>
        <span className="text-term-dim">{"//"}</span>
        <span className="text-term-amber">[BUILD]</span>
        <span>a3f9c1</span>
        <span className="caret text-acid">█</span>
      </TerminalStrip>

      <a id="motion" />
      <RuledDivider label="MOTION" pattern="eq" />
      <Card stamp code="DS.06" label="MOTION UTILITIES">
        <div className="grid sm:grid-cols-2 gap-4 text-[12px]">
          <div className="border border-ink-0 p-3 bg-paper-0">
            <div className="text-[10px] uppercase tracking-widest text-ink-3 mb-1">.glitch</div>
            <span className="glitch font-display font-bold text-[40px] leading-none" data-text="ERROR">ERROR</span>
          </div>
          <div className="border border-ink-0 p-3 bg-paper-0">
            <div className="text-[10px] uppercase tracking-widest text-ink-3 mb-1">.typewriter</div>
            <span className="typewriter inline-block font-mono text-[14px]">$ cat /var/log/nikolass.log_</span>
          </div>
          <div className="border border-ink-0 p-3 bg-paper-0">
            <div className="text-[10px] uppercase tracking-widest text-ink-3 mb-1">.load-meter</div>
            <span className="load-meter w-full" />
          </div>
          <div className="border border-ink-0 p-3 bg-paper-0">
            <div className="text-[10px] uppercase tracking-widest text-ink-3 mb-1">.caret · .scan-line</div>
            <span className="font-mono text-[14px]">typing<span className="caret">█</span></span>
          </div>
        </div>
      </Card>
    </div>
  );
}
