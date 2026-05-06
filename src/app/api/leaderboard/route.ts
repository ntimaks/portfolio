import { NextResponse } from "next/server";
import { z } from "zod";
import { getSupabase, hashIp } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const Score = z.object({
  initials: z.string().regex(/^[A-Z0-9]{3}$/),
  score: z.number().int().min(0).max(99_999),
  startedAt: z.number().int().positive(),
});

type Entry = { id: string; initials: string; score: number; played_at: string };

const SEED: Entry[] = [
  { id: "seed-1", initials: "NIK", score: 480, played_at: new Date(Date.now() - 86400_000).toISOString() },
  { id: "seed-2", initials: "AAA", score: 220, played_at: new Date(Date.now() - 3600_000).toISOString() },
  { id: "seed-3", initials: "ZZ9", score: 180, played_at: new Date(Date.now() - 1800_000).toISOString() },
];

export async function GET() {
  const sb = getSupabase();
  if (!sb) return NextResponse.json({ scores: SEED, db: "off" });
  const { data } = await sb
    .from("scores")
    .select("id, initials, score, played_at")
    .order("score", { ascending: false })
    .limit(20);
  return NextResponse.json({ scores: data ?? [] });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = Score.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "invalid" }, { status: 400 });

  const { initials, score, startedAt } = parsed.data;
  const elapsed = Date.now() - startedAt;
  if (score > 0 && elapsed < (score / 10) * 50) {
    return NextResponse.json({ error: "rejected" }, { status: 400 });
  }

  const sb = getSupabase();
  if (!sb) return NextResponse.json({ ok: true, db: "off" });

  const { data, error } = await sb
    .from("scores")
    .insert({ initials, score, ip_hash: hashIp(req) })
    .select("id, initials, score, played_at")
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, entry: data });
}
