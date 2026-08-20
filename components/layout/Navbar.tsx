"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Terminal } from "lucide-react";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";

const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/research", label: "Research" },
  { href: "/blog", label: "Blog" },
  { href: "/publications", label: "Publications" },
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

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out rounded-2xl ${scrolled
          ? "w-[95%] lg:w-[90%] glass py-3 px-6"
          : "w-[95%] lg:w-[75%] xl:w-[65%] py-5 px-6 bg-transparent border border-transparent"
          }`}
      >
        <nav className="flex items-center justify-between w-full h-full">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight z-50">
            <Image src="/dark_logo.png" alt="SiliconBrain AI Logo" width={140} height={50} className="h-10 md:h-12 w-auto object-contain show-in-light" />
            <Image src="/logo.png" alt="SiliconBrain AI Logo" width={140} height={50} className="h-10 md:h-12 w-auto object-contain show-in-dark" />
            {/* <span className="gradient-text">SiliconBrain AI</span> */}
          </Link>

          <div className="hidden lg:flex items-center gap-5 xl:gap-7">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-[var(--color-cyan)] ${pathname === link.href ? "text-[var(--color-cyan)]" : "text-[var(--color-text-muted)]"
                  }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="btn-secondary !py-2 !px-4 text-sm whitespace-nowrap"
            >
              <Terminal className="w-4 h-4" />
              Contact Us
            </Link>
            <ThemeToggle />
          </div>

          <div className="lg:hidden flex items-center gap-3 z-50">
            <ThemeToggle />
            <button
              className="text-[var(--color-text)]"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay and Panel */}
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] lg:hidden"
            />

            {/* Slide-in Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] sm:w-[320px] bg-[var(--color-bg-elevated)] border-l border-[var(--color-border)] z-[70] lg:hidden flex flex-col shadow-2xl"
            >
              <div className="p-6 flex items-center justify-between border-b border-[var(--color-border)]">
                <Image src="/dark_logo.png" alt="SiliconBrain AI Logo" width={140} height={50} className="h-8 sm:h-10 w-auto object-contain show-in-light" />
                <Image src="/logo.png" alt="SiliconBrain AI Logo" width={140} height={50} className="h-8 sm:h-10 w-auto object-contain show-in-dark" />
                <button
                  className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors p-2 rounded-full hover:bg-[var(--color-surface)]"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col p-6 gap-2 overflow-y-auto">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`py-3 px-4 rounded-xl text-base font-medium transition-colors ${pathname === link.href
                      ? "bg-[var(--color-surface)] text-[var(--color-primary)]"
                      : "text-[var(--color-text-muted)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text)]"
                      }`}
                  >
                    {link.label}
                  </Link>
                ))}

                <div className="mt-6 pt-6 border-t border-[var(--color-border)]">
                  <Link
                    href="/contact"
                    className="btn-primary w-full justify-center"
                  >
                    <Terminal className="w-4 h-4" />
                    Contact Command
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
