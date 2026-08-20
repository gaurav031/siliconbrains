"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { Github, Linkedin, Mail, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <footer className="border-t border-[var(--color-border)] mt-24">
      <div className="container-max py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg mb-4">
            <Image src="/dark_logo.png" alt="SiliconBrain AI Logo" width={200} height={60} className="h-12 md:h-14 w-auto object-contain show-in-light" />
            <Image src="/logo.png" alt="SiliconBrain AI Logo" width={200} height={60} className="h-12 md:h-14 w-auto object-contain show-in-dark" />
            {/* <span className="gradient-text">SiliconBrain AI</span> */}
          </Link>
          <p className="text-sm text-[var(--color-text-muted)] max-w-sm mb-6">
            Building AI products for space technology, Earth observation AI, computer vision for satellite imagery, and the future of satellite AI solutions.
          </p>
          <div className="flex gap-3">
            <a href="https://github.com/siliconbrainsai" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full glass glass-hover">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com/company/siliconbrainsai" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full glass glass-hover">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="mailto:contact@siliconbrainsai.com" className="w-10 h-10 flex items-center justify-center rounded-full glass glass-hover">
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-sm tracking-wide uppercase text-[var(--color-text-muted)]">
            Quick Links
          </h4>
          <ul className="space-y-3 text-sm">
            {[
              ["Projects", "/projects"],
              ["Research", "/research"],
              ["GitHub", "/github"],
              ["Blog", "/blog"],
              ["Contact", "/contact"],
            ].map(([label, href]) => (
              <li key={href}>
                <Link href={href} className="text-[var(--color-text-muted)] hover:text-[var(--color-cyan)] transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-sm tracking-wide uppercase text-[var(--color-text-muted)]">
            Newsletter
          </h4>
          <p className="text-sm text-[var(--color-text-muted)] mb-4">
            Research updates, launches, and technical deep-dives — no spam.
          </p>
          <form onSubmit={handleSubscribe} className="flex gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="flex-1 min-w-0 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-full px-4 py-2 text-sm outline-none focus:border-[var(--color-primary)]"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-10 h-10 shrink-0 rounded-full bg-[var(--color-primary)] flex items-center justify-center hover:opacity-90 transition-opacity"
              aria-label="Subscribe"
            >
              {status === "loading" ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : status === "success" ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : (
                <ArrowRight className="w-4 h-4" />
              )}
            </button>
          </form>
          {status === "success" && (
            <p className="text-xs text-[var(--color-cyan)] mt-2">Subscribed! Welcome aboard.</p>
          )}
          {status === "error" && (
            <p className="text-xs text-red-400 mt-2">Something went wrong. Try again.</p>
          )}
        </div>
      </div>

      <div className="border-t border-[var(--color-border)] py-6">
        <div className="container-max flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-[var(--color-text-muted)]">
          <p>© {new Date().getFullYear()} SiliconBrain AI. All rights reserved.</p>
          <p>Built with Next.js, PostgreSQL & Prisma.</p>
        </div>
      </div>
    </footer>
  );
}
