"use client";
import * as React from "react";
import { siteConfig } from "@/lib/site-config";
import { MetaStrip } from "@/components/primitives";

export function MetaStripBar() {
  const [time, setTime] = React.useState("--:--:--");
  React.useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit", minute: "2-digit", second: "2-digit",
          timeZone: siteConfig.location.tz,
        }),
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  const today = new Date().toLocaleDateString("en-GB", {
    day: "2-digit", month: "2-digit", year: "2-digit", timeZone: siteConfig.location.tz,
  }).replace(/\//g, ".");

  // Mobile: collapse to date + status only.
  return (
    <div className="border-b border-ink-0">
      <div className="hidden sm:block">
        <MetaStrip
          compact
          cells={[
            { lbl: "DATE",     val: today, sub: time },
            { lbl: "OPERATOR", val: siteConfig.name, sub: "engineer" },
            { lbl: "BASED",    val: `${siteConfig.location.city}, ${siteConfig.location.country}`, sub: siteConfig.location.tz },
            { lbl: "STATUS",   val: "available",    sub: "selectively", live: true },
            { lbl: "VOL",      val: "01",           sub: "2026" },
          ]}
        />
      </div>
      <div className="sm:hidden">
        <MetaStrip
          compact
          cells={[
            { lbl: "DATE",   val: today, sub: time },
            { lbl: "STATUS", val: "available", live: true },
          ]}
        />
      </div>
    </div>
  );
}
