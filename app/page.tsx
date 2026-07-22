import Link from "next/link";
import { ArrowRight, Github, Satellite, BrainCircuit, Radar, Cpu } from "lucide-react";
import SpaceBackground from "@/components/home/SpaceBackground";
import { SectionHeading, GlassCard, Badge } from "@/components/ui/Section";
import { prisma } from "@/lib/prisma";

async function getFeaturedProjects() {
  try {
    return await prisma.project.findMany({ where: { featured: true }, take: 3 });
  } catch {
    return [];
  }
}

export default async function Home() {
  const featuredProjects = await getFeaturedProjects();

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <SpaceBackground />
        <div className="container-max relative z-10 pt-24 text-center">
          <Badge>Mission Control for Space AI</Badge>
          <h1 className="mt-6 text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]">
            Building <span className="gradient-text">AI</span> for Future
            <br /> Space Missions
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-[var(--color-text-muted)] leading-relaxed">
            Artificial Intelligence for Autonomous Satellites, Spacecraft Health Monitoring,
            Digital Twins, Predictive Maintenance, and Space Intelligence.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/projects" className="btn-primary">
              Explore Projects <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/research" className="btn-secondary">
              Research
            </Link>
            <Link href="/contact" className="btn-secondary">
              Contact
            </Link>
            <a
              href="https://github.com/siliconbrainsai"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <Github className="w-4 h-4" /> GitHub
            </a>
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="section-padding relative">
        <div className="container-max">
          <SectionHeading
            eyebrow="Capabilities"
            title="Space Intelligence, Engineered End-to-End"
            description="From onboard inference to fleet-wide predictive analytics, we build the AI infrastructure the next generation of space missions will run on."
            center
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Satellite,
                title: "Autonomous Satellites",
                desc: "Onboard decisioning that keeps missions running through comms blackouts.",
              },
              {
                icon: Radar,
                title: "Health Monitoring",
                desc: "Real-time telemetry analytics and anomaly detection at fleet scale.",
              },
              {
                icon: BrainCircuit,
                title: "Digital Twins",
                desc: "Physics + ML hybrid twins for simulation and contingency planning.",
              },
              {
                icon: Cpu,
                title: "Edge AI / TinyML",
                desc: "Deterministic, radiation-tolerant inference on flight hardware.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <GlassCard key={title}>
                <Icon className="w-8 h-8 text-[var(--color-primary)] mb-4" />
                <h3 className="font-semibold text-lg mb-2">{title}</h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="section-padding relative bg-[var(--color-bg-elevated)]">
        <div className="container-max">
          <SectionHeading
            eyebrow="Selected Work"
            title="Featured Projects"
            description="A sample of the AI systems we've engineered for spacecraft health, autonomy, and mission intelligence."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(featuredProjects.length
              ? featuredProjects
              : [
                  { slug: "satellite-telemetry-analytics", title: "Satellite Telemetry Analytics", category: "Data Intelligence", overview: "Real-time anomaly detection across multi-channel satellite telemetry." },
                  { slug: "digital-twin-satellite", title: "Digital Twin of Satellite", category: "Digital Twin", overview: "High-fidelity physics + ML twin synchronized with live telemetry." },
                  { slug: "autonomous-satellite-health-management", title: "Autonomous Satellite Health Management", category: "Flagship System", overview: "Unified AI platform fusing analytics, twin simulation, and autonomy." },
                ]
            ).map((p: any) => (
              <Link key={p.slug} href={`/projects/${p.slug}`}>
                <GlassCard className="h-full flex flex-col">
                  <Badge>{p.category}</Badge>
                  <h3 className="font-semibold text-xl mt-4 mb-2">{p.title}</h3>
                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed line-clamp-3">
                    {p.overview}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm text-[var(--color-cyan)]">
                    View Project <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </GlassCard>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/projects" className="btn-secondary">
              View All Projects <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding relative">
        <div className="container-max">
          <div className="glass rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.15),transparent_70%)]" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Let&apos;s Build the Future of Space Intelligence Together
              </h2>
              <p className="text-[var(--color-text-muted)] max-w-xl mx-auto mb-8">
                Open to research collaborations with space agencies, universities, and
                SpaceTech companies worldwide.
              </p>
              <Link href="/contact" className="btn-primary">
                Get in Touch <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
