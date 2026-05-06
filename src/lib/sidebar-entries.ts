// Per-route sidebar entries. Each entry is a clickable nav item;
// `tags` are surfaced as filter chips in the sidebar drawer.
import { sideProjects, workEntries } from "./content";

export type SidebarEntry = {
  id: string;
  href: string;
  date?: string;
  title: string;
  kind: string;
  meta?: string;
  tags?: string[];
};

export type SidebarSection = {
  label: string;
  entries: SidebarEntry[];
  tags: string[];
};

const ROUTE_NAV: SidebarEntry[] = [
  { id: "index",    href: "/",              title: "Index",         kind: "ROOT",  meta: "00" },
  { id: "projects", href: "/projects",      title: "Projects",      kind: "CAT",   meta: "01" },
  { id: "work",     href: "/work",          title: "Work",          kind: "VOL",   meta: "02" },
  { id: "arcade",   href: "/arcade",        title: "Arcade",        kind: "PLAY",  meta: "03" },
  { id: "panel",    href: "/control-panel", title: "Control Panel", kind: "PNL",   meta: "04" },
  { id: "design",   href: "/design",        title: "Design",        kind: "DS",    meta: "05" },
  { id: "contact",  href: "/contact",       title: "Contact",       kind: "MSG",   meta: "06" },
];

export function sectionFor(pathname: string): SidebarSection {
  if (pathname.startsWith("/projects")) {
    return {
      label: "C A T A L O G U E",
      entries: sideProjects.map((p) => ({
        id: p.slug,
        href: `/projects/${p.slug}`,
        date: p.date,
        title: p.title,
        kind: p.type.toUpperCase(),
        tags: p.tags,
      })),
      tags: Array.from(new Set(sideProjects.flatMap((p) => p.tags ?? []))).sort(),
    };
  }
  if (pathname.startsWith("/work")) {
    return {
      label: "W O R K",
      entries: workEntries.map((w, i) => ({
        id: w.company,
        href: w.url,
        date: w.period,
        title: w.company,
        kind: w.role.toUpperCase(),
        meta: `VOL.${String(i + 1).padStart(2, "0")}`,
        tags: w.stack,
      })),
      tags: Array.from(new Set(workEntries.flatMap((w) => w.stack ?? []))).sort(),
    };
  }
  if (pathname.startsWith("/arcade")) {
    return {
      label: "A R C A D E",
      entries: [
        { id: "snake", href: "/arcade", title: "Snake.exe", kind: "GAME", meta: "v0.1", date: "2026.05" },
      ],
      tags: ["GAME", "BETA"],
    };
  }
  if (pathname.startsWith("/control-panel")) {
    return {
      label: "P A N E L",
      entries: [
        { id: "now",       href: "#now",       title: "Now playing",   kind: "MUSIC" },
        { id: "presence",  href: "#presence",  title: "Presence",      kind: "DATA" },
        { id: "telemetry", href: "#telemetry", title: "Telemetry",     kind: "SYS" },
        { id: "weather",   href: "#weather",   title: "Weather",       kind: "WX" },
      ],
      tags: [],
    };
  }
  if (pathname.startsWith("/design")) {
    return {
      label: "D E S I G N   S Y S T E M",
      entries: [
        { id: "color",  href: "#color",  title: "Color",      kind: "DS.01" },
        { id: "type",   href: "#type",   title: "Type",       kind: "DS.02" },
        { id: "fields", href: "#fields", title: "Fields",     kind: "DS.03" },
        { id: "btns",   href: "#btns",   title: "Buttons",    kind: "DS.04" },
        { id: "cards",  href: "#cards",  title: "Cards",      kind: "DS.05" },
        { id: "motion", href: "#motion", title: "Motion",     kind: "DS.06" },
        { id: "roles",  href: "#roles",  title: "Color roles",kind: "DS.07" },
      ],
      tags: [],
    };
  }
  // Default: show top-level routes
  return {
    label: "I N D E X",
    entries: ROUTE_NAV,
    tags: [],
  };
}
