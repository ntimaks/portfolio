import { NextResponse } from "next/server";
import { getSupabase, visitorId } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const TTL_SECONDS = 60;

export async function GET() {
  const sb = getSupabase();
  if (!sb) return NextResponse.json({ count: 0, db: "off" });
  const cutoff = new Date(Date.now() - TTL_SECONDS * 1000).toISOString();
  const { count } = await sb
    .from("presence_pings")
    .select("*", { count: "exact", head: true })
    .gt("last_seen", cutoff);
  return NextResponse.json({ count: count ?? 0 });
}

export async function POST(req: Request) {
  const sb = getSupabase();
  if (!sb) return NextResponse.json({ count: 1, db: "off" });
  const id = visitorId(req);
  const now = new Date().toISOString();

  await sb.from("presence_pings").upsert({ visitor_id: id, last_seen: now });

  // opportunistic reap
  const cutoff = new Date(Date.now() - TTL_SECONDS * 4 * 1000).toISOString();
  await sb.from("presence_pings").delete().lt("last_seen", cutoff);

  const liveCutoff = new Date(Date.now() - TTL_SECONDS * 1000).toISOString();
  const { count } = await sb
    .from("presence_pings")
    .select("*", { count: "exact", head: true })
    .gt("last_seen", liveCutoff);
  return NextResponse.json({ count: count ?? 0 });
}
