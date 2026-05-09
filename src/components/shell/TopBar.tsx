"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";

const NAV = [
  { code: "00", label: "INDEX",    href: "/" },
  { code: "01", label: "PROJECTS", href: "/projects" },
  { code: "02", label: "WORK",     href: "/work" },
  { code: "03", label: "ARCADE",   href: "/arcade" },
  { code: "04", label: "PANEL",    href: "/control-panel" },
  { code: "05", label: "DESIGN",   href: "/design" },
  { code: "06", label: "CONTACT",  href: "/contact" },
];

export function TopBar({
  drawerOpen,
  onDrawerToggle,
}: {
  drawerOpen: boolean;
  onDrawerToggle: () => void;
}) {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();

  return (
    <header className="border-b border-ink-0 bg-paper-1 h-[44px] flex items-stretch text-[10px] tracking-[0.2em] uppercase">
      {/* Hamburger (mobile) */}
      <button
        type="button"
        aria-label="Toggle navigation"
        onClick={onDrawerToggle}
        className="lg:hidden px-3 border-r border-ink-0 flex items-center cursor-pointer hover:bg-paper-2 transition-colors"
      >
        <span className="font-mono text-[14px]">{drawerOpen ? "✕" : "≡"}</span>
      </button>

      {/* Nav */}
      <nav className="flex items-stretch flex-1 overflow-x-auto">
        {NAV.map((n) => {
          const active = n.href === "/" ? pathname === "/" : pathname.startsWith(n.href);
          return (
            <Link
              key={n.href}
              href={n.href}
              className={`group/nav px-2 lg:px-3 flex items-center gap-1 lg:gap-2 border-r border-ink-0 no-underline transition-colors duration-[120ms] whitespace-nowrap ${
                active
                  ? "bg-acid text-on-acid"
                  : "text-ink-0 hover:bg-paper-2"
              }`}
            >
              <span
                className={`hidden lg:inline font-pixel text-[16px] tracking-normal leading-none ${
                  active ? "text-on-acid opacity-70" : "text-ink-3"
                }`}
              >
                [{n.code}]
              </span>
              <span>{n.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Theme toggle */}
      <button
        type="button"
        onClick={toggle}
        aria-label="Toggle theme"
        className="px-3 border-l border-ink-0 flex items-center gap-1.5 cursor-pointer hover:bg-paper-2 transition-colors text-ink-0"
      >
        <span className="text-[12px] leading-none">{theme === "light" ? "◐" : "◑"}</span>
        <span className="hidden sm:inline">{theme === "light" ? "DARK" : "LIGHT"}</span>
      </button>
    </header>
  );
}
