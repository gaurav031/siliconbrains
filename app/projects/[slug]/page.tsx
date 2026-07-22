import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Github, ArrowLeft, Layers, Target, Lightbulb, BarChart3, Cpu } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Badge, GlassCard } from "@/components/ui/Section";

async function getProject(slug: string) {
  try {
    return await prisma.project.findUnique({ where: { slug } });
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: "Project" };
  return {
    title: project.title,
    description: project.overview,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) notFound();

  const sections = [
    { icon: Layers, title: "Overview", content: project.overview },
    { icon: Target, title: "Problem", content: project.problem },
    { icon: Lightbulb, title: "Solution", content: project.solution },
    { icon: Cpu, title: "Architecture", content: project.architecture },
    { icon: BarChart3, title: "Results", content: project.results },
  ];

  return (
    <div className="pt-32 pb-20">
      <div className="container-max">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-white mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Projects
        </Link>

        <Badge>{project.category}</Badge>
        <h1 className="text-3xl md:text-5xl font-bold mt-6 mb-6 max-w-3xl">{project.title}</h1>

        <div className="flex flex-wrap gap-3 mb-12">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <Github className="w-4 h-4" /> View on GitHub
            </a>
          )}
        </div>

        {/* Screenshot placeholder */}
        <div className="glass rounded-2xl aspect-video w-full mb-14 flex items-center justify-center text-[var(--color-text-muted)] text-sm">
          Project Screenshot / Diagram Placeholder
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {sections.map(({ icon: Icon, title, content }) => (
              <GlassCard key={title}>
                <div className="flex items-center gap-3 mb-3">
                  <Icon className="w-5 h-5 text-[var(--color-primary)]" />
                  <h3 className="font-semibold text-lg">{title}</h3>
                </div>
                <p className="text-[var(--color-text-muted)] leading-relaxed text-sm">{content}</p>
              </GlassCard>
            ))}
          </div>

          <div className="space-y-6">
            <GlassCard>
              <h3 className="font-semibold text-lg mb-4">AI Models</h3>
              <div className="flex flex-wrap gap-2">
                {(Array.isArray(project.aiModels) ? project.aiModels : (typeof project.aiModels === 'string' ? (project.aiModels as string).split(',') : [])).map((m: string) => (
                  <span key={m} className="text-xs bg-white/5 border border-[var(--color-border)] rounded-full px-3 py-1">
                    {m}
                  </span>
                ))}
              </div>
            </GlassCard>

            <GlassCard>
              <h3 className="font-semibold text-lg mb-4">Technology Stack</h3>
              <div className="flex flex-wrap gap-2">
                {(Array.isArray(project.techStack) ? project.techStack : (typeof project.techStack === 'string' ? (project.techStack as string).split(',') : [])).map((t: string) => (
                  <span key={t} className="text-xs bg-white/5 border border-[var(--color-border)] rounded-full px-3 py-1">
                    {t}
                  </span>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}