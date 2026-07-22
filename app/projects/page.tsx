import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Github } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Badge, GlassCard } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore SiliconBrainsAI's AI projects for space: satellite telemetry analytics, fault detection, predictive maintenance, digital twins, and autonomous decision engines.",
};

const fallbackProjects = [
  { slug: "satellite-telemetry-analytics", title: "Satellite Telemetry Analytics", category: "Data Intelligence", overview: "Real-time analytics ingesting multi-channel satellite telemetry to surface anomalies before failure." },
  { slug: "ai-fault-detection", title: "AI-Based Fault Detection", category: "Spacecraft Health", overview: "Onboard and ground-based fault classification using supervised and self-supervised learning." },
  { slug: "predictive-maintenance", title: "Predictive Maintenance", category: "Reliability Engineering", overview: "Forecasting component degradation trends across satellite fleets." },
  { slug: "remaining-useful-life-prediction", title: "Remaining Useful Life Prediction", category: "Reliability Engineering", overview: "RUL estimation for critical spacecraft components." },
  { slug: "explainable-ai", title: "Explainable AI for Mission Systems", category: "Trustworthy AI", overview: "A model-agnostic explainability layer for mission-critical AI decisions." },
  { slug: "onboard-ai", title: "Onboard AI Compute Framework", category: "Edge AI", overview: "A lightweight, deterministic inference runtime for flight computers." },
  { slug: "digital-twin-satellite", title: "Digital Twin of Satellite", category: "Digital Twin", overview: "High-fidelity digital twin synchronized with live telemetry." },
  { slug: "autonomous-decision-engine", title: "Autonomous Decision Engine", category: "Autonomous Systems", overview: "Enables spacecraft to autonomously respond to anomalies without ground intervention." },
  { slug: "autonomous-satellite-health-management", title: "AI-Powered Autonomous Satellite Health Management System", category: "Flagship System", overview: "Our flagship integrated satellite health management platform." },
];

async function getProjects() {
  try {
    const projects = await prisma.project.findMany({ orderBy: { createdAt: "desc" } });
    return projects.length ? projects : fallbackProjects;
  } catch {
    return fallbackProjects;
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="pt-32 pb-20">
      <div className="container-max mb-14">
        <Badge>Engineering</Badge>
        <h1 className="text-4xl md:text-5xl font-bold mt-6 mb-6">Projects</h1>
        <p className="text-lg text-[var(--color-text-muted)] max-w-2xl leading-relaxed">
          AI systems engineered for spacecraft health, autonomy, and mission intelligence —
          from telemetry analytics to fully autonomous decision engines.
        </p>
      </div>

      <div className="container-max grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p: any) => (
          <Link key={p.slug} href={`/projects/${p.slug}`}>
            <GlassCard className="h-full flex flex-col">
              <Badge>{p.category}</Badge>
              <h3 className="font-semibold text-xl mt-4 mb-2">{p.title}</h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed line-clamp-3 flex-1">
                {p.overview}
              </p>
              <div className="mt-5 flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-sm text-[var(--color-cyan)]">
                  View Details <ArrowRight className="w-3.5 h-3.5" />
                </span>
                <Github className="w-4 h-4 text-[var(--color-text-muted)]" />
              </div>
            </GlassCard>
          </Link>
        ))}
      </div>
    </div>
  );
}
