import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk, VT323, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import { Frame } from "@/components/shell/Frame";
import { themeBootScript } from "@/components/shell/ThemeProvider";
import { siteConfig } from "@/lib/site-config";
import { Analytics } from '@vercel/analytics/next';

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
    <html lang="en" className={`${mono.variable} ${display.variable} ${pixel.variable} ${serif.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body className="antialiased">
        <Frame>{children}</Frame>
        <Analytics />
      </body>
    </html>
  );
}
