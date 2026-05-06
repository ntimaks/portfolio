import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk, VT323, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import { TopStrip } from "@/components/control-panel/TopStrip";
import { BottomStrip } from "@/components/control-panel/BottomStrip";
import { siteConfig } from "@/lib/site-config";

const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-jb" });
const display = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-grotesk" });
const pixel = VT323({ subsets: ["latin"], weight: ["400"], variable: "--font-vt" });
const serif = DM_Serif_Display({ subsets: ["latin"], weight: ["400"], style: ["normal", "italic"], variable: "--font-dms" });

export const metadata: Metadata = {
  title: `${siteConfig.name} // ${siteConfig.tagline}`,
  description: siteConfig.bio,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${mono.variable} ${display.variable} ${pixel.variable} ${serif.variable}`}>
      <body className="min-h-screen flex flex-col">
        <TopStrip />
        <main className="flex-1 pt-[36px] pb-[42px]">{children}</main>
        <BottomStrip />
      </body>
    </html>
  );
}
