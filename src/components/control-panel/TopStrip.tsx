import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

const NAV = [
  { code: "00", label: "INDEX",   href: "/" },
  { code: "01", label: "PROJECTS", href: "/projects" },
  { code: "02", label: "WORK",    href: "/work" },
  { code: "03", label: "ARCADE",  href: "/arcade" },
  { code: "04", label: "PANEL",   href: "/control-panel" },
  { code: "05", label: "DESIGN",  href: "/design" },
  { code: "06", label: "CONTACT", href: "/contact" },
];

export function TopStrip() {
  return (
    <header className="fixed top-0 inset-x-0 z-40 h-[36px] bg-paper-1 border-b border-ink-0 flex items-stretch text-[10px] tracking-[0.2em] uppercase">
      <Link href="/" className="px-3 flex items-center gap-2 border-r border-ink-0 bg-ink-0 text-paper-0 font-bold no-underline">
        <span>{siteConfig.name}</span>
        <span className="text-acid">●</span>
      </Link>
      <nav className="flex-1 flex items-stretch overflow-x-auto">
        {NAV.map((n) => (
          <Link
            key={n.href}
            href={n.href}
            className="px-3 flex items-center gap-2 border-r border-ink-0 hover:bg-acid no-underline text-ink-0"
          >
            <span className="text-ink-3">[{n.code}]</span>
            <span>{n.label}</span>
          </Link>
        ))}
      </nav>
      <div className="hidden md:flex items-center px-3 text-ink-3">
        // {siteConfig.location.city.toUpperCase()}, {siteConfig.location.country}
      </div>
    </header>
  );
}
