export const siteConfig = {
  name: "NIKOLASS",
  tagline: "logbook & catalogue",
  bio: "I build things. I keep notes. These are some of them.",
  location: { city: "Riga", country: "LV", tz: "Europe/Riga" },
  lastfm: { user: process.env.LASTFM_USER ?? "nikolass" },
  appleMusicProfileUrl: "https://music.apple.com/profile/ntimaks",
  socials: [
    { code: "GITHUB",   url: "https://github.com/nikolass" },
    { code: "X",        url: "https://x.com/nikolass" },
    { code: "LINKEDIN", url: "https://linkedin.com/in/nikolass" },
    { code: "EMAIL",    url: "mailto:nikolass.timaks@hackmotion.com" },
  ],
  playlists: [
    { code: "PL.01", title: "sunset", url: "https://music.apple.com/lv/playlist/pl.u-dEaBTMbbJ1DR" },
    { code: "PL.02", title: "rappity rap rap",        url: "https://music.apple.com/lv/playlist/pl.u-3zg4TPbbMGdW" },
    { code: "PL.03", title: "zzZZZzzzZZZ",          url: "https://music.apple.com/lv/playlist/pl.u-9NDysx33m6Xr" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
