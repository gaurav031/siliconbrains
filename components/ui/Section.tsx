import { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  description,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  center?: boolean;
}) {
  return (
    <div className={`mb-12 ${center ? "text-center mx-auto max-w-2xl" : ""}`}>
      {eyebrow && (
        <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[var(--color-cyan)] mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{title}</h2>
      {description && (
        <p className="text-[var(--color-text-muted)] text-base md:text-lg leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center text-xs font-medium px-3 py-1 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)]">
      {children}
    </span>
  );
}

export function GlassCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`glass glass-hover rounded-2xl p-6 ${className}`}>{children}</div>;
}
