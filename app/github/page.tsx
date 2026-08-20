import type { Metadata } from "next";
import { Star, GitFork, ExternalLink } from "lucide-react";
import { Badge, GlassCard, SectionHeading } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "GitHub",
  description: "Open source projects, AI products repositories, and contributions from SiliconBrain AI.",
};

const GITHUB_ORG = "siliconbrainsai";

async function getRepos() {
  try {
    const res = await fetch(`https://api.github.com/orgs/${GITHUB_ORG}/repos?per_page=12&sort=updated`, {
      next: { revalidate: 3600 },
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!res.ok) throw new Error("failed");
    return await res.json();
  } catch {
    return null;
  }
}

const fallbackRepos = [
  { name: "satellite-telemetry-analytics", description: "Real-time anomaly detection pipeline for satellite telemetry.", stargazers_count: 128, forks_count: 24, language: "Python", html_url: "https://github.com/siliconbrainsai/satellite-telemetry-analytics" },
  { name: "digital-twin-satellite", description: "Physics + ML hybrid digital twin for LEO satellites.", stargazers_count: 96, forks_count: 18, language: "TypeScript", html_url: "https://github.com/siliconbrainsai/digital-twin-satellite" },
  { name: "onboard-ai", description: "Deterministic TinyML inference runtime for flight computers.", stargazers_count: 74, forks_count: 12, language: "C", html_url: "https://github.com/siliconbrainsai/onboard-ai" },
  { name: "explainable-ai", description: "Model-agnostic explainability toolkit for mission-critical AI.", stargazers_count: 61, forks_count: 9, language: "Python", html_url: "https://github.com/siliconbrainsai/explainable-ai" },
];

export default async function GitHubPage() {
  const live = await getRepos();
  const repos = Array.isArray(live) && live.length ? live : fallbackRepos;

  return (
    <div className="pt-32 pb-20">
      <div className="container-max mb-14">
        <Badge>Open Source</Badge>
        <h1 className="text-4xl md:text-5xl font-bold mt-6 mb-6">GitHub</h1>
        <p className="text-lg text-[var(--color-text-muted)] max-w-2xl leading-relaxed">
          We open-source tooling wherever mission constraints allow. Explore our
          repositories, pinned projects, and contributions.
        </p>
        {!Array.isArray(live) && (
          <p className="text-xs text-[var(--color-text-muted)] mt-4">
            Showing sample data — live GitHub org data will populate once the{" "}
            <code>siliconbrainsai</code> organization is public and reachable.
          </p>
        )}
      </div>

      <div className="container-max grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {repos.map((repo: any) => (
          <a key={repo.name} href={repo.html_url} target="_blank" rel="noopener noreferrer">
            <GlassCard className="h-full flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">{repo.name}</h3>
                <ExternalLink className="w-4 h-4 text-[var(--color-text-muted)]" />
              </div>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed flex-1">
                {repo.description || "No description provided."}
              </p>
              <div className="mt-5 flex items-center gap-4 text-xs text-[var(--color-text-muted)]">
                {repo.language && <span>{repo.language}</span>}
                <span className="inline-flex items-center gap-1">
                  <Star className="w-3.5 h-3.5" /> {repo.stargazers_count}
                </span>
                <span className="inline-flex items-center gap-1">
                  <GitFork className="w-3.5 h-3.5" /> {repo.forks_count}
                </span>
              </div>
            </GlassCard>
          </a>
        ))}
      </div>

      <div className="container-max mt-16">
        <SectionHeading eyebrow="Get Involved" title="Contributions Welcome" />
        <GlassCard>
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
            We welcome issues, pull requests, and discussions from the community. Check
            each repository&apos;s <code>CONTRIBUTING.md</code> for guidelines on how to
            get started.
          </p>
        </GlassCard>
      </div>
    </div>
  );
}
