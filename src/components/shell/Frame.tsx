"use client";
import * as React from "react";
import { ThemeProvider } from "./ThemeProvider";
import { MetaStripBar } from "./MetaStripBar";
import { TopBar } from "./TopBar";
import { Tagline } from "./Tagline";
import { Sidebar } from "./Sidebar";
import { FooterTerminal } from "./FooterTerminal";

export function Frame({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  return (
    <ThemeProvider>
      <div className="h-screen flex flex-col">
        <div className="shrink-0">
          <TopBar drawerOpen={drawerOpen} onDrawerToggle={() => setDrawerOpen((o) => !o)} />
          <MetaStripBar />
          <Tagline />
        </div>
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)] min-h-0 overflow-hidden">
          <Sidebar open={drawerOpen} onClose={() => setDrawerOpen(false)} />
          <main className="min-h-0 overflow-y-auto overflow-x-hidden">{children}</main>
        </div>
        <FooterTerminal />
      </div>
    </ThemeProvider>
  );
}
