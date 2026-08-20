import Link from "next/link";
import { ArrowRight, Github, Satellite, BrainCircuit, Radar, Cpu, Terminal, ChevronDown } from "lucide-react";
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
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        {/* Abstract Background Layers */}
        <div className="absolute inset-0 bg-grid pointer-events-none z-0"></div>
        
        {/* Orbital Sphere / Earth Graphic */}
        <div 
          className="absolute inset-0 z-0 flex items-center justify-center opacity-100 dark:opacity-60 pointer-events-none overflow-hidden transition-all duration-500"
          style={{ mixBlendMode: 'var(--earth-blend)' as any }}
        >
          <div 
            className="w-full h-[60vh] max-w-[800px] mt-20 md:mt-0 bg-cover bg-center rounded-full transition-all duration-500" 
            style={{ 
              backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD9uB9efEom5Wxq5kYMg1uHjnPpIm-6TVpCFmYXHMxlLRe7LvmhpxU_Z3Ghudc_gaYBmDbBoRGRRnQoY_2F1SlyrOGaIF0ObLlGGOukrR4aX_17ZRZGcAi482iXUAEADx9JnqXc9jeovbOM6aa-urdG8fCCTYc-6aMcOd1jevbbPFtfSKZr3c9dw8W_blstgTmd6bzL9Ac-bHjnsWhmdbSQ4dUuCuLM1F5_b99UiHruh8Qbl-YT1jlI')",
              filter: 'var(--earth-filter)',
              WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 65%)',
              maskImage: 'radial-gradient(circle at center, black 40%, transparent 65%)'
            }}
          ></div>
        </div>

        {/* Orbital Rings & Planets */}
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none mt-20 md:mt-0">
          {[
            { size: 360, duration: 35, color: 'var(--color-cyan)', delay: '0s' },
            { size: 520, duration: 50, color: 'var(--color-purple)', delay: '-10s' },
            { size: 720, duration: 75, color: 'var(--color-primary)', delay: '-25s' },
          ].map((orbit, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: orbit.size,
                height: orbit.size,
                animation: `spin ${orbit.duration}s linear infinite`,
                animationDelay: orbit.delay
              }}
            >
              {/* Ring Border */}
              <div className="absolute inset-0 rounded-full border border-[var(--color-text)] opacity-10 dark:opacity-20 pointer-events-none" />
              
              {/* Planet */}
              <div
                className="absolute rounded-full"
                style={{
                  width: 10,
                  height: 10,
                  top: -5,
                  left: "50%",
                  transform: "translateX(-50%)",
                  backgroundColor: orbit.color,
                  boxShadow: `0 0 15px ${orbit.color}`,
                }}
              />
            </div>
          ))}
        </div>
        
        {/* Floating Data Nodes */}
        <div className="absolute top-[30%] left-[10%] w-3 h-3 rounded-full bg-[var(--color-primary)] animate-pulse-node z-0"></div>
        <div className="absolute top-[60%] right-[15%] w-4 h-4 rounded-full bg-[var(--color-purple)] animate-pulse-node z-0" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-[20%] left-[25%] w-2 h-2 rounded-full bg-[var(--color-cyan)] animate-pulse-node z-0" style={{ animationDelay: '3s' }}></div>

        <div className="relative z-10 w-full px-4 max-w-4xl mx-auto flex flex-col items-center text-center mt-12 md:mt-0 pt-20">
          {/* Badge / Chip */}
          <div className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] backdrop-blur-md animate-float">
            <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-pulse"></span>
            <span className="text-xs text-[var(--color-primary)] uppercase tracking-widest font-medium">System Online</span>
          </div>

          {/* Headline */}
          <h1 className="text-[40px] leading-[1.1] sm:text-5xl md:text-7xl font-bold text-[var(--color-text)] mb-6 text-glow tracking-tight">
            SiliconBrain AI: <br />
            <span className="gradient-text leading-[1.1]">Products for Space Technology</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg text-[var(--color-text-muted)] max-w-2xl mx-auto mb-10 px-2 leading-relaxed">
            Advanced AI-powered satellite analytics, computer vision, and Earth observation solutions for the final frontier.
          </p>

          {/* Mobile CTA Cluster */}
          <div className="flex flex-col w-full sm:flex-row items-center justify-center gap-4 px-4 sm:px-0">
            <Link href="/projects" className="w-full sm:w-auto px-8 py-4 rounded-full bg-[var(--color-primary)] text-white text-sm font-semibold uppercase tracking-widest neon-glow hover:opacity-90 transition-colors active:scale-95 duration-200 flex items-center justify-center gap-2">
              Explore Projects
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact" className="w-full sm:w-auto px-8 py-4 rounded-full bg-[var(--color-surface)] backdrop-blur-xl border border-[var(--color-border)] text-[var(--color-primary)] text-sm font-semibold uppercase tracking-widest hover:border-[var(--color-primary)] transition-colors active:scale-95 duration-200 flex items-center justify-center gap-2">
              Contact Command
              <Terminal className="w-4 h-4" />
            </Link>
          </div>

          {/* Scroll Indicator */}
          <div className="mt-24 opacity-50 hidden md:flex flex-col items-center gap-2 animate-bounce">
            <span className="text-xs text-[var(--color-text-muted)] uppercase font-medium tracking-widest">Scroll Down</span>
            <ChevronDown className="w-5 h-5 text-[var(--color-text-muted)]" />
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="section-padding relative">
        <div className="container-max">
          <SectionHeading
            eyebrow="AI Capabilities"
            title="Advanced AI Solutions for Space Technology"
            description="From AI-powered satellite analytics to satellite-based ship detection, we build the Earth observation AI infrastructure that the next generation of space missions runs on."
            center
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Satellite,
                title: "Satellite AI Products",
                desc: "Onboard decisioning and AI satellite technology that keeps missions running through comms blackouts.",
              },
              {
                icon: Radar,
                title: "Satellite Image Analysis",
                desc: "Computer vision for satellite imagery, enabling real-time anomaly detection at fleet scale.",
              },
              {
                icon: BrainCircuit,
                title: "AI Ship Detection",
                desc: "Advanced maritime AI for satellite-based ship detection and Earth observation AI applications.",
              },
              {
                icon: Cpu,
                title: "Geospatial AI",
                desc: "AI for remote sensing and intelligent geospatial analysis running on edge hardware.",
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
            title="Featured AI Products"
            description="A sample of the AI solutions we've engineered for satellite image analysis, ship detection, and space intelligence."
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
                Let&apos;s Build the Future of Geospatial AI Together
              </h2>
              <p className="text-[var(--color-text-muted)] max-w-xl mx-auto mb-8">
                SiliconBrain AI is open to research collaborations and AI product development with space agencies and SpaceTech companies worldwide.
              </p>
              <Link href="/contact" className="btn-primary">
                Get in Touch <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/6304001323?text=I%20want%20to%20see%20your%20product."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-[#25D366] text-white shadow-[0_4px_14px_0_rgba(37,211,102,0.39)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.23)] hover:scale-110 transition-all duration-300 flex items-center justify-center group"
        aria-label="Contact us on WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </>
  );
}
