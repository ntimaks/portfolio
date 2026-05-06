"use client";
import { useCallback, useEffect, useState } from "react";
import { Card } from "@/components/primitives";

type Entry = { id: string; initials: string; score: number; played_at: number };

export function Leaderboard({ refreshKey }: { refreshKey: number }) {
  const [scores, setScores] = useState<Entry[]>([]);

  const fetchScores = useCallback(async () => {
    const r = await fetch("/api/leaderboard", { cache: "no-store" });
    const j = await r.json();
    setScores(j.scores ?? []);
  }, []);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { fetchScores(); }, [fetchScores, refreshKey]);

  return (
    <Card stamp code="HI.SCORE" label="LEADERBOARD // TOP 20">
      <table className="w-full font-mono text-[13px]">
        <thead>
          <tr className="text-[10px] tracking-widest uppercase text-ink-3 border-b border-ink-0">
            <th className="text-left py-1.5 pr-2">#</th>
            <th className="text-left pr-2">INI</th>
            <th className="text-right pr-2">SCORE</th>
            <th className="text-right">DATE</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((s, i) => (
            <tr key={s.id} className="border-b border-dotted border-ink-5">
              <td className="py-1 text-ink-3">{String(i + 1).padStart(2, "0")}</td>
              <td className="font-bold tracking-widest">{s.initials}</td>
              <td className="text-right">{String(s.score).padStart(4, "0")}</td>
              <td className="text-right text-ink-3 text-[11px]">
                {new Date(s.played_at).toISOString().slice(2, 10).replace(/-/g, ".")}
              </td>
            </tr>
          ))}
          {scores.length === 0 && (
            <tr>
              <td colSpan={4} className="py-4 text-center text-ink-3 text-[12px]">
                {"// no scores filed yet."}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Card>
  );
}
