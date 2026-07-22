import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.siliconbrainsai.com"),
  title: {
    default: "SiliconBrainsAI — Building AI for Future Space Missions",
    template: "%s | SiliconBrainsAI",
  },
  description:
    "SiliconBrainsAI builds artificial intelligence for autonomous satellites, spacecraft health monitoring, digital twins, predictive maintenance, and space intelligence.",
  keywords: [
    "Space AI",
    "Satellite AI",
    "Spacecraft Health Monitoring",
    "Digital Twin Satellite",
    "Predictive Maintenance AI",
    "Autonomous Satellites",
    "ISRO AI collaboration",
    "TinyML Space",
  ],
  authors: [{ name: "SiliconBrainsAI" }],
  openGraph: {
    title: "SiliconBrainsAI — Building AI for Future Space Missions",
    description:
      "Artificial Intelligence for Autonomous Satellites, Spacecraft Health Monitoring, Digital Twins, Predictive Maintenance, and Space Intelligence.",
    url: "https://www.siliconbrainsai.com",
    siteName: "SiliconBrainsAI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SiliconBrainsAI — Building AI for Future Space Missions",
    description:
      "Artificial Intelligence for Autonomous Satellites, Spacecraft Health Monitoring, Digital Twins & Space Intelligence.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
