import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cached: SupabaseClient | null = null;

/**
 * Server-side Supabase client (service role). Never import from a client component.
 * Returns null when env is not configured — callers should treat that as "DB disabled"
 * and fall back to a stub response instead of crashing.
 */
export function getSupabase(): SupabaseClient | null {
  if (cached) return cached;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}

export function hashIp(req: Request): string {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anon";
  // simple non-cryptographic hash — IP is not stored in plaintext
  let h = 5381;
  for (let i = 0; i < ip.length; i++) h = (h * 33) ^ ip.charCodeAt(i);
  return (h >>> 0).toString(36);
}

export function visitorId(req: Request): string {
  const ua = req.headers.get("user-agent") || "";
  const ip = hashIp(req);
  let h = 5381;
  for (let i = 0; i < ua.length; i++) h = (h * 33) ^ ua.charCodeAt(i);
  return `${ip}.${(h >>> 0).toString(36)}`;
}
