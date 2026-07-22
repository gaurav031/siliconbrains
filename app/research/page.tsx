import type { Metadata } from "next";
import { SectionHeading, GlassCard, Badge } from "@/components/ui/Section";
import { Brain, Satellite, Radar, Cpu, Eye, Rocket, Sparkles, ShieldCheck, Network, Boxes } from "lucide-react";

export const metadata: Metadata = {
  title: "Research",
  description:
    "SiliconBrainsAI's research areas span Space AI, satellite telemetry, digital twins, computer vision, autonomous space systems, edge AI, and explainable AI.",
};

const researchAreas = [
  { icon: Brain, title: "Artificial Intelligence" },
  { icon: Satellite, title: "Space AI" },
  { icon: Radar, title: "Satellite Telemetry" },
  { icon: Network, title: "Machine Learning" },
  { icon: Boxes, title: "Digital Twin" },
  { icon: Eye, title: "Computer Vision" },
  { icon: Rocket, title: "Autonomous Space Systems" },
  { icon: Cpu, title: "Edge AI" },
  { icon: Sparkles, title: "TinyML" },
  { icon: ShieldCheck, title: "Explainable AI" },
];

const roadmap = [
  { phase: "Phase 1 — Foundations", detail: "Telemetry analytics, fault detection, and explainability infrastructure across ground systems." },
  { phase: "Phase 2 — Onboard Intelligence", detail: "Deterministic edge inference and TinyML deployment on flight-qualified hardware." },
  { phase: "Phase 3 — Autonomy", detail: "Constrained reinforcement learning for real-time anomaly response without ground intervention." },
  { phase: "Phase 4 — Fleet-Scale Intelligence", detail: "Multi-agent coordination across satellite constellations with shared digital twins." },
];

export default function ResearchPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="container-max mb-14">
        <Badge>Research</Badge>
        <h1 className="text-4xl md:text-5xl font-bold mt-6 mb-6">Research at SiliconBrainsAI</h1>
        <p className="text-lg text-[var(--color-text-muted)] max-w-2xl leading-relaxed">
          We treat research as core infrastructure — every production system traces back
          to a rigorously validated hypothesis about how AI should behave in space.
        </p>
      </div>

      <div className="container-max mb-20">
        <SectionHeading eyebrow="Focus Areas" title="Research Areas" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {researchAreas.map(({ icon: Icon, title }) => (
            <GlassCard key={title} className="text-center flex flex-col items-center py-8">
              <Icon className="w-7 h-7 text-[var(--color-cyan)] mb-3" />
              <span className="text-sm font-medium">{title}</span>
            </GlassCard>
          ))}
        </div>
      </div>

      <div className="container-max mb-20">
        <SectionHeading eyebrow="Roadmap" title="Research Roadmap & Future Research" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roadmap.map((r) => (
            <GlassCard key={r.phase}>
              <h3 className="font-semibold text-lg mb-2 text-[var(--color-primary)]">{r.phase}</h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{r.detail}</p>
            </GlassCard>
          ))}
        </div>
      </div>

      <div className="container-max grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard>
          <h3 className="font-semibold text-lg mb-3">Research Collaborations</h3>
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
            We actively seek collaboration opportunities with space agencies including
            ISRO, IN-SPACe, NASA, ESA, and JAXA, as well as universities and SpaceTech
            companies globally, on joint research programs, data-sharing agreements, and
            technology demonstrations.
          </p>
        </GlassCard>
        <GlassCard>
          <h3 className="font-semibold text-lg mb-3">Research Interests</h3>
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
            Physics-informed learning, uncertainty quantification for safety-critical
            systems, multi-agent autonomy, generative models for synthetic telemetry, and
            interpretable-by-design architectures for regulated aerospace environments.
          </p>
        </GlassCard>
      </div>
    </div>
  );
}
