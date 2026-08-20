import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.siliconbrainsai.com"),
  title: {
    default: "SiliconBrain AI | Satellite AI Products & Space Technology",
    template: "%s | SiliconBrain AI",
  },
  description:
    "SiliconBrain AI develops advanced AI products and solutions for space technology. We specialize in AI-powered satellite analytics, satellite image analysis, ship detection, and computer vision for satellite imagery.",
  keywords: [
    "SiliconBrain AI",
    "Silicon Brains AI",
    "AI products",
    "AI solutions",
    "Satellite AI",
    "satellite AI products",
    "satellite imagery AI",
    "AI satellite technology",
    "space technology",
    "AI for space technology",
    "satellite image analysis",
    "ship detection",
    "AI ship detection",
    "satellite-based ship detection",
    "maritime AI",
    "geospatial AI",
    "Earth observation AI",
    "AI-powered satellite analytics",
    "computer vision for satellite imagery",
    "AI for remote sensing"
  ],
  authors: [{ name: "SiliconBrain AI" }],
  openGraph: {
    title: "SiliconBrain AI | AI for Space Technology & Satellite Analytics",
    description:
      "SiliconBrain AI specializes in AI products for space technology, satellite imagery AI, AI-powered satellite analytics, and satellite-based ship detection.",
    url: "https://www.siliconbrainsai.com",
    siteName: "SiliconBrain AI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SiliconBrain AI | Satellite AI & Space Technology",
    description:
      "Discover AI solutions for space technology, satellite image analysis, ship detection, and Earth observation AI by SiliconBrain AI.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
