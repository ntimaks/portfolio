"use client";
import { useEffect, useState } from "react";
import { Card } from "@/components/primitives";

type NP = {
  nowPlaying: boolean;
  track?: string;
  artist?: string;
  album?: string;
  art?: string | null;
} | null;

export function NowPlayingCard({ className = "" }: { className?: string }) {
  const [np, setNp] = useState<NP>(null);

  useEffect(() => {
    let active = true;
    const fetchNow = async () => {
      try {
        const r = await fetch("/api/now-playing", { cache: "no-store" });
        if (!r.ok) return;
        const j = await r.json();
        if (active) setNp(j);
      } catch {}
    };
    fetchNow();
    const id = setInterval(fetchNow, 30_000);
    return () => {
      active = false;
      clearInterval(id);
    };
  }, []);

  return (
    <Card
      className={className}
      code={np?.nowPlaying ? "NOW PLAYING" : "LAST PLAYED"}
      label="MUSIC // APPLE → LAST.FM"
      stamp
    >
      <div className="flex gap-4 items-center">
        <div className="w-[112px] h-[112px] bg-ink-0 border border-ink-0 flex items-center justify-center text-paper-0 font-pixel text-[20px] relative overflow-hidden shrink-0">
          {np?.art ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={np.art} alt="" className="halftone w-full h-full object-cover" />
          ) : (
            <span className="opacity-60">▓░ NO ART ░▓</span>
          )}
          {np?.nowPlaying && <div className="scan-line" />}
        </div>
        <div className="min-w-0">
          <div className="text-[10px] tracking-[0.2em] uppercase text-ink-3 mb-1 flex items-center gap-2">
            {np?.nowPlaying ? (
              <>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-acid caret" /> on the air
              </>
            ) : (
              "off air"
            )}
          </div>
          <div className="font-mono font-bold text-[18px] leading-snug truncate">
            {np?.track ?? "—"}
          </div>
          <div className="text-[13px] text-ink-2 truncate">{np?.artist ?? ""}</div>
          {np?.album && <div className="text-[11px] text-ink-3 mt-1 truncate">{np.album}</div>}
        </div>
      </div>
    </Card>
  );
}
