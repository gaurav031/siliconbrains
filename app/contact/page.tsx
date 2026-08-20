import type { Metadata } from "next";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { Badge, GlassCard } from "@/components/ui/Section";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with SiliconBrain AI for research, commercial AI product development, speaking, workshop, investment, or internship collaboration.",
};

export default function ContactPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="container-max mb-14">
        <Badge>Contact</Badge>
        <h1 className="text-4xl md:text-5xl font-bold mt-6 mb-6">Let&apos;s Talk</h1>
        <p className="text-lg text-[var(--color-text-muted)] max-w-2xl leading-relaxed">
          Whether it&apos;s a research collaboration, commercial partnership, or a
          speaking invitation — we&apos;d love to hear from you.
        </p>
      </div>

      <div className="container-max grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <ContactForm />
        </div>

        <div className="space-y-6">
          <GlassCard>
            <h3 className="font-semibold mb-4">Connect With Us</h3>
            <div className="space-y-3 text-sm">
              <a href="mailto:contact@siliconbrainsai.com" className="flex items-center gap-3 text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">
                <Mail className="w-4 h-4" /> contact@siliconbrainsai.com
              </a>
              <a href="https://github.com/siliconbrainsai" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">
                <Github className="w-4 h-4" /> github.com/siliconbrainsai
              </a>
              <a href="https://linkedin.com/company/siliconbrainsai" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">
                <Linkedin className="w-4 h-4" /> linkedin.com/company/siliconbrainsai
              </a>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-4 h-4 text-[var(--color-cyan)]" />
              <h3 className="font-semibold">Location</h3>
            </div>
            <div className="rounded-xl overflow-hidden aspect-video w-full bg-[var(--color-surface)] flex items-center justify-center text-xs text-[var(--color-text-muted)]">
              Google Map Placeholder
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
