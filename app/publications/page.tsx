import type { Metadata } from "next";
import { ExternalLink, FileText } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Badge, GlassCard, SectionHeading } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Publications",
  description: "Research papers, conference papers, technical whitepapers, case studies, books, and patents by SiliconBrain AI.",
};

const fallback = [
  { id: "1", title: "Physics-Informed Deep Learning for Spacecraft Fault Classification", type: "Research Paper", authors: ["SiliconBrain AI Research Team"], venue: "IAC", year: 2025, abstract: "A physics-informed neural architecture for spacecraft subsystem fault classification.", link: "#" },
];

const categories = ["Research Papers", "Conference Papers", "Technical Whitepapers", "Case Studies", "Books", "Patents"];

async function getPublications() {
  try {
    const pubs = await prisma.publication.findMany({ orderBy: { year: "desc" } });
    return pubs.length ? pubs : fallback;
  } catch {
    return fallback;
  }
}

export default async function PublicationsPage() {
  const publications = await getPublications();

  return (
    <div className="pt-32 pb-20">
      <div className="container-max mb-14">
        <Badge>Publications</Badge>
        <h1 className="text-4xl md:text-5xl font-bold mt-6 mb-6">Publications</h1>
        <p className="text-lg text-[var(--color-text-muted)] max-w-2xl leading-relaxed">
          Our research output — spanning peer-reviewed papers, whitepapers, case studies,
          and patents at the intersection of AI and space systems.
        </p>
      </div>

      <div className="container-max flex flex-wrap gap-2 mb-12">
        {categories.map((c) => (
          <span key={c} className="text-xs font-medium px-3 py-1.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)]">
            {c}
          </span>
        ))}
      </div>

      <div className="container-max space-y-5">
        {publications.map((pub: any) => (
          <GlassCard key={pub.id}>
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <FileText className="w-5 h-5 text-[var(--color-primary)]" />
                  <Badge>{pub.type}</Badge>
                  <span className="text-xs text-[var(--color-text-muted)]">{pub.year}</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">{pub.title}</h3>
                <p className="text-sm text-[var(--color-text-muted)] mb-2">
                  {pub.authors.join(", ")} {pub.venue ? `· ${pub.venue}` : ""}
                </p>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{pub.abstract}</p>
              </div>
              <a
                href={pub.link || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary !py-2 !px-4 text-sm shrink-0"
              >
                View <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="container-max mt-16">
        <SectionHeading eyebrow="Ahead" title="Future Publications" />
        <GlassCard>
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
            Upcoming work includes research on multi-agent autonomy for satellite
            constellations, uncertainty-aware onboard decisioning, and generative models
            for synthetic telemetry augmentation — targeted for submission to IEEE
            Aerospace and IAC in the coming cycles.
          </p>
        </GlassCard>
      </div>
    </div>
  );
}
