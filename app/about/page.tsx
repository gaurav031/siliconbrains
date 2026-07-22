import type { Metadata } from "next";
import { SectionHeading, GlassCard, Badge } from "@/components/ui/Section";
import { Target, Eye, Rocket, Lightbulb, Cpu, Satellite } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about SiliconBrainsAI's mission, vision, founder story, and technology areas spanning AI, machine learning, and space intelligence.",
};

const techAreas = [
  "Artificial Intelligence",
  "Machine Learning",
  "Computer Vision",
  "Satellite Intelligence",
  "Digital Twins",
  "Space Robotics",
  "Autonomous Systems",
  "Predictive Analytics",
  "TinyML",
  "Edge AI",
];

export default function AboutPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="container-max">
        <Badge>About Us</Badge>
        <h1 className="text-4xl md:text-5xl font-bold mt-6 mb-6 max-w-3xl">
          Engineering the AI Layer for Humanity&apos;s Next Era in Space
        </h1>
        <p className="text-lg text-[var(--color-text-muted)] max-w-2xl leading-relaxed">
          SiliconBrainsAI is a deep-tech company at the intersection of artificial
          intelligence and space systems engineering, building the intelligence layer
          spacecraft need to operate autonomously, reliably, and safely.
        </p>
      </div>

      {/* Mission / Vision */}
      <div className="container-max section-padding grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard>
          <Target className="w-8 h-8 text-[var(--color-primary)] mb-4" />
          <h3 className="text-xl font-semibold mb-3">Mission</h3>
          <p className="text-[var(--color-text-muted)] leading-relaxed">
            To engineer trustworthy, explainable, and resource-efficient AI systems that
            give spacecraft the ability to sense, reason, and act autonomously — reducing
            mission risk and extending the reach of human exploration.
          </p>
        </GlassCard>
        <GlassCard>
          <Eye className="w-8 h-8 text-[var(--color-purple)] mb-4" />
          <h3 className="text-xl font-semibold mb-3">Vision</h3>
          <p className="text-[var(--color-text-muted)] leading-relaxed">
            A future where every spacecraft, from small LEO satellites to deep-space
            probes, carries onboard intelligence capable of independent judgment —
            making space exploration safer, cheaper, and more ambitious.
          </p>
        </GlassCard>
      </div>

      {/* Story */}
      <div className="container-max section-padding">
        <SectionHeading eyebrow="Our Story" title="Company Story" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <GlassCard className="lg:col-span-2">
            <p className="text-[var(--color-text-muted)] leading-relaxed mb-4">
              SiliconBrainsAI was founded on a simple observation: spacecraft generate
              enormous volumes of telemetry, yet most of it is analyzed reactively, long
              after an anomaly has already impacted mission health. We set out to close
              that gap — building AI systems that reason about spacecraft state in real
              time, both on the ground and onboard.
            </p>
            <p className="text-[var(--color-text-muted)] leading-relaxed">
              What began as research into anomaly detection for satellite telemetry has
              grown into a full technology stack spanning fault detection, predictive
              maintenance, digital twins, and autonomous decision-making — all unified
              under a single explainable-AI philosophy.
            </p>
          </GlassCard>
          <GlassCard>
            <Rocket className="w-8 h-8 text-[var(--color-cyan)] mb-4" />
            <h3 className="text-xl font-semibold mb-3">Founder Story</h3>
            <p className="text-[var(--color-text-muted)] leading-relaxed text-sm">
              Founded by engineers with a shared background in machine learning and
              aerospace systems, SiliconBrainsAI was built to bridge the gap between
              cutting-edge AI research and the rigorous reliability standards space
              missions demand.
            </p>
          </GlassCard>
        </div>
      </div>

      {/* Why + Philosophy */}
      <div className="container-max section-padding grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard>
          <Lightbulb className="w-8 h-8 text-[var(--color-primary)] mb-4" />
          <h3 className="text-xl font-semibold mb-3">Why SiliconBrainsAI</h3>
          <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
            <li>• Deep expertise at the intersection of AI and aerospace engineering</li>
            <li>• Explainability built into every production model, not bolted on</li>
            <li>• Resource-aware design for radiation-tolerant flight hardware</li>
            <li>• Research-driven, publication-backed engineering practices</li>
          </ul>
        </GlassCard>
        <GlassCard>
          <Cpu className="w-8 h-8 text-[var(--color-purple)] mb-4" />
          <h3 className="text-xl font-semibold mb-3">Research Philosophy &amp; Innovation Approach</h3>
          <p className="text-[var(--color-text-muted)] leading-relaxed text-sm">
            We treat every deployed model as a hypothesis to be rigorously tested against
            real telemetry, physics constraints, and safety requirements — publishing our
            findings and open-sourcing tooling wherever mission constraints allow.
          </p>
        </GlassCard>
      </div>

      {/* Technology Areas */}
      <div className="container-max section-padding">
        <SectionHeading eyebrow="Expertise" title="Technology Areas" center />
        <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
          {techAreas.map((area) => (
            <span
              key={area}
              className="glass px-5 py-2.5 rounded-full text-sm font-medium flex items-center gap-2"
            >
              <Satellite className="w-3.5 h-3.5 text-[var(--color-cyan)]" />
              {area}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
