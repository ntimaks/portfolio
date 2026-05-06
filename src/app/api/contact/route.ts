import { NextResponse } from "next/server";
import { z } from "zod";
import { getSupabase, hashIp } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const Body = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(200),
  message: z.string().min(1).max(4000),
  honeypot: z.string().max(0).optional(),
});

const HOUR_MS = 3600_000;
const LIMIT = 5;

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = Body.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "invalid" }, { status: 400 });
  if (parsed.data.honeypot) return NextResponse.json({ ok: true });

  const ipHash = hashIp(req);
  const sb = getSupabase();

  if (sb) {
    const since = new Date(Date.now() - HOUR_MS).toISOString();
    const { count } = await sb
      .from("contact_messages")
      .select("*", { count: "exact", head: true })
      .eq("ip_hash", ipHash)
      .gt("created_at", since);
    if ((count ?? 0) >= LIMIT) {
      return NextResponse.json({ error: "rate-limited" }, { status: 429 });
    }
    const { error } = await sb.from("contact_messages").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      message: parsed.data.message,
      ip_hash: ipHash,
    });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (process.env.RESEND_API_KEY && process.env.CONTACT_TO) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM ?? "portfolio@nikolass.dev",
          to: process.env.CONTACT_TO,
          reply_to: parsed.data.email,
          subject: `[MSG] ${parsed.data.name}`,
          text: parsed.data.message,
        }),
      });
    } catch {
      // message persisted; email is best-effort
    }
  }

  return NextResponse.json({ ok: true, db: sb ? "on" : "off" });
}
