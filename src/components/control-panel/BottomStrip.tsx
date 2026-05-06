"use client";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site-config";

type NowPlaying = {
  nowPlaying: boolean;
  track?: string;
  artist?: string;
  album?: string;
  art?: string;
} | null;

export function BottomStrip() {
  const [now, setNow] = useState<NowPlaying>(null);
  const [time, setTime] = useState("");
  const [visitors, setVisitors] = useState<number | null>(null);
  const buildHash = (process.env.NEXT_PUBLIC_BUILD_HASH ?? "local").slice(0, 7);

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: siteConfig.location.tz,
        }),
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    let active = true;
    const fetchNow = async () => {
      try {
        const r = await fetch("/api/now-playing", { cache: "no-store" });
        if (!r.ok) return;
        const j = await r.json();
        if (active) setNow(j);
      } catch {}
    };
    fetchNow();
    const id = setInterval(fetchNow, 30_000);
    return () => {
      active = false;
      clearInterval(id);
    };
  }, []);

  useEffect(() => {
    let active = true;
    const ping = async () => {
      try {
        const r = await fetch("/api/presence", { method: "POST", cache: "no-store" });
        if (!r.ok) return;
        const j = await r.json();
        if (active) setVisitors(j.count ?? null);
      } catch {}
    };
    ping();
    const id = setInterval(ping, 20_000);
    return () => {
      active = false;
      clearInterval(id);
    };
  }, []);

  const trackLine = now
    ? now.nowPlaying
      ? `♪ ${now.track} — ${now.artist}`
      : `last: ${now.track} — ${now.artist}`
    : "—";

  return (
    <footer className="fixed bottom-0 inset-x-0 z-40 h-[42px] bg-term-bg text-term-fg border-t border-ink-0 font-pixel text-[18px] leading-none flex items-center overflow-hidden">
      <Cell label="NOW" value={trackLine} live={!!now?.nowPlaying} />
      <Cell label="VISITORS" value={visitors == null ? "…" : String(visitors).padStart(2, "0")} />
      <Cell label="TIME" value={`${time} ${siteConfig.location.tz.split("/")[1]}`} />
      <Cell label="LOC" value={`${siteConfig.location.city}, ${siteConfig.location.country}`} />
      <Cell label="BUILD" value={buildHash} />
      <span className="caret px-3 text-acid">█</span>
    </footer>
  );
}

function Cell({ label, value, live = false }: { label: string; value: string; live?: boolean }) {
  return (
    <div className="px-3 h-full flex items-center gap-2 border-r border-term-dim/40 whitespace-nowrap">
      <span className="text-term-dim text-[14px] tracking-widest">[{label}]</span>
      <span>{value}</span>
      {live && <span className="caret text-acid">●</span>}
      <span className="text-term-dim ml-1">//</span>
    </div>
  );
}
