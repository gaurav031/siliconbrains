"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Rocket, Github } from "lucide-react";

const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/research", label: "Research" },
  { href: "/blog", label: "Blog" },
  { href: "/publications", label: "Publications" },
  { href: "/github", label: "GitHub" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass py-3" : "py-5 bg-transparent"
      }`}
    >
      <nav className="container-max flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight">
          <Rocket className="w-5 h-5 text-[var(--color-primary)]" />
          <span className="gradient-text">SiliconBrainsAI</span>
        </Link>

        <div className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-[var(--color-cyan)] ${
                pathname === link.href ? "text-[var(--color-cyan)]" : "text-[var(--color-text-muted)]"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://github.com/siliconbrainsai"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary !py-2 !px-4 text-sm"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
        </div>

        <button
          className="lg:hidden text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden glass mt-3 mx-4 rounded-2xl"
          >
            <div className="flex flex-col p-4 gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="py-3 px-3 rounded-lg text-sm font-medium text-[var(--color-text-muted)] hover:bg-white/5 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
