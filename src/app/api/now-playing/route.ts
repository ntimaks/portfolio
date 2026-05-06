import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site-config";

export const revalidate = 30;

type Track = {
  name: string;
  artist: { "#text": string };
  album?: { "#text": string };
  image?: { "#text": string }[];
  "@attr"?: { nowplaying?: string };
};

export async function GET() {
  const apiKey = process.env.LASTFM_API_KEY;
  const user = siteConfig.lastfm.user;
  if (!apiKey) {
    return NextResponse.json(
      { nowPlaying: false, track: "Stuck on Repeat", artist: "Little Boots", album: "Hands", art: null, mock: true },
      { headers: { "cache-control": "public, max-age=30" } },
    );
  }
  try {
    const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${encodeURIComponent(
      user,
    )}&api_key=${apiKey}&format=json&limit=1`;
    const r = await fetch(url, { next: { revalidate: 30 } });
    if (!r.ok) throw new Error(`lastfm ${r.status}`);
    const j = await r.json();
    const t: Track | undefined = j.recenttracks?.track?.[0] ?? j.recenttracks?.track;
    if (!t) return NextResponse.json({ nowPlaying: false });
    const art = t.image?.find((i) => i["#text"])?.["#text"] ?? null;
    return NextResponse.json({
      nowPlaying: t["@attr"]?.nowplaying === "true",
      track: t.name,
      artist: t.artist["#text"],
      album: t.album?.["#text"] ?? null,
      art,
    });
  } catch (e) {
    return NextResponse.json({ nowPlaying: false, error: String(e) }, { status: 200 });
  }
}
