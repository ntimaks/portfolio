export type SideProject = {
  slug: string;
  title: string;
  type: "poster" | "video" | "render" | "app";
  date: string; // YYYY.MM.DD
  blurb: string;
  cover?: string;
  tags?: string[];
  links?: { label: string; url: string }[];
  body?: string; // long-form markdown-ish
};

export type WorkEntry = {
  company: string;
  role: string;
  period: string; // 2023.03 → 2024.11
  url: string;
  blurb: string;
  stack?: string[];
};

export const sideProjects: SideProject[] = [
  {
    slug: "loc-dashboard",
    title: "LOC // an internal dashboard",
    type: "app",
    date: "2025.10.04",
    blurb: "A dense ops dashboard. Status panels, telemetry, no chrome.",
    tags: ["next.js", "supabase", "tailwind"],
    links: [{ label: "case study", url: "#" }],
  },
  {
    slug: "fl33-poster",
    title: "Certain Uncertainties [VOL.2]",
    type: "poster",
    date: "2025.06.29",
    blurb: "Bilingual technical poster. Halftone fire. 333 LAB tribute.",
    tags: ["print", "halftone"],
  },
  {
    slug: "kitchen-render",
    title: "Kitchen radio, 03:14",
    type: "render",
    date: "2025.04.18",
    blurb: "A still life of a transistor radio. Blender, cycles, 2400 samples.",
    tags: ["blender", "render"],
  },
  {
    slug: "drives-at-2am",
    title: "Drives at 02:00",
    type: "video",
    date: "2025.02.11",
    blurb: "Eight minutes of dashcam, scored.",
    tags: ["video", "score"],
  },
];

export const workEntries: WorkEntry[] = [
  {
    company: "Hackmotion",
    role: "software engineer",
    period: "2024.06 → present",
    url: "https://hackmotion.com",
    blurb: "Sensor data, swing analytics, wearables. Web + firmware-adjacent.",
    stack: ["typescript", "next.js", "python", "embedded-bridge"],
  },
  {
    company: "[redacted]",
    role: "engineer",
    period: "2022.09 → 2024.05",
    url: "#",
    blurb: "Logistics platform. Internal tooling, ETL, B2B integrations.",
    stack: ["node", "postgres", "react"],
  },
];

export function getSideProject(slug: string) {
  return sideProjects.find((p) => p.slug === slug);
}
