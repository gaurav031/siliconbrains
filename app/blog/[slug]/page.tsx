import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, User } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/Section";

async function getPost(slug: string) {
  try {
    return await prisma.blogPost.findUnique({ where: { slug } });
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
  const post = await getPost(slug);
  if (!post) return { title: "Blog Post" };
  return { title: post.title, description: post.excerpt };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  return (
    <div className="pt-32 pb-20">
      <div className="container-max max-w-3xl">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-white mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>

        <Badge>{post.category}</Badge>
        <h1 className="text-3xl md:text-5xl font-bold mt-6 mb-6 leading-tight">{post.title}</h1>

        <div className="flex items-center gap-6 text-sm text-[var(--color-text-muted)] mb-10">
          <span className="inline-flex items-center gap-1.5">
            <User className="w-4 h-4" /> {post.author}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="w-4 h-4" /> {post.readTimeMin} min read
          </span>
        </div>

        <div className="glass rounded-2xl aspect-video w-full mb-10 flex items-center justify-center text-[var(--color-text-muted)] text-sm">
          Cover Image Placeholder
        </div>

        <p className="text-lg text-[var(--color-text-muted)] leading-relaxed mb-6">{post.excerpt}</p>
        <div className="text-[var(--color-text)] leading-relaxed whitespace-pre-line">{post.content}</div>

        <div className="flex flex-wrap gap-2 mt-10">
          {post.tags.map((t: string) => (
            <span key={t} className="text-xs bg-white/5 border border-[var(--color-border)] rounded-full px-3 py-1">
              #{t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
