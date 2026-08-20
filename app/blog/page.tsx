import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Badge, GlassCard, SectionHeading } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Blog",
  description: "Technical blogs on AI products, machine learning, Earth observation AI, satellites, research, satellite image analysis, computer vision, and deep learning from SiliconBrain AI.",
};

const categories = ["AI", "Machine Learning", "Space", "Satellite", "Research", "Python", "Computer Vision", "Deep Learning"];

const fallbackPosts = [
  { slug: "why-space-needs-onboard-ai", title: "Why Space Missions Need Onboard AI, Not Just Ground-Based Analytics", excerpt: "Communication blackouts and light-speed delay mean spacecraft must think for themselves.", category: "Space", readTimeMin: 6 },
  { slug: "anomaly-detection-satellite-telemetry", title: "A Practical Guide to Anomaly Detection in Satellite Telemetry", excerpt: "Comparing isolation forests, autoencoders, and physics-informed models.", category: "Machine Learning", readTimeMin: 8 },
  { slug: "digital-twins-for-spacecraft", title: "Building Digital Twins for Spacecraft: Lessons from the Field", excerpt: "What we learned fusing physics simulation with residual neural correction.", category: "Research", readTimeMin: 7 },
];

async function getPosts() {
  try {
    const posts = await prisma.blogPost.findMany({ orderBy: { publishedAt: "desc" } });
    return posts.length ? posts : fallbackPosts;
  } catch {
    return fallbackPosts;
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="pt-32 pb-20">
      <div className="container-max mb-10">
        <Badge>Blog</Badge>
        <h1 className="text-4xl md:text-5xl font-bold mt-6 mb-6">Technical Blog</h1>
        <p className="text-lg text-[var(--color-text-muted)] max-w-2xl leading-relaxed">
          Deep-dives into the AI, ML, and systems engineering behind space intelligence.
        </p>
      </div>

      <div className="container-max flex flex-wrap gap-2 mb-12">
        {categories.map((c) => (
          <span key={c} className="text-xs font-medium px-3 py-1.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)]">
            {c}
          </span>
        ))}
      </div>

      <div className="container-max grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post: any) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <GlassCard className="h-full flex flex-col">
              <Badge>{post.category}</Badge>
              <h3 className="font-semibold text-lg mt-4 mb-2 leading-snug">{post.title}</h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed flex-1 line-clamp-3">
                {post.excerpt}
              </p>
              <div className="mt-5 flex items-center justify-between text-xs text-[var(--color-text-muted)]">
                <span className="inline-flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {post.readTimeMin} min read
                </span>
                <span className="inline-flex items-center gap-1 text-[var(--color-cyan)]">
                  Read <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </GlassCard>
          </Link>
        ))}
      </div>
    </div>
  );
}
