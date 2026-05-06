export const siteConfig = {
  name: "NIKOLASS",
  tagline: "logbook & catalogue",
  bio: "I build things. I keep notes. These are some of them.",
  location: { city: "Riga", country: "LV", tz: "Europe/Riga" },
  lastfm: { user: process.env.LASTFM_USER ?? "nikolass" },
  appleMusicProfileUrl: "https://music.apple.com/profile/nikolass",
  socials: [
    { code: "GITHUB",   url: "https://github.com/nikolass" },
    { code: "X",        url: "https://x.com/nikolass" },
    { code: "LINKEDIN", url: "https://linkedin.com/in/nikolass" },
    { code: "EMAIL",    url: "mailto:nikolass.timaks@hackmotion.com" },
  ],
  playlists: [
    { code: "PL.01", title: "deep work / mono drone", url: "https://music.apple.com/" },
    { code: "PL.02", title: "drives at 02.00",        url: "https://music.apple.com/" },
    { code: "PL.04", title: "kitchen radio",          url: "https://music.apple.com/" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
