import type { ReactNode } from "react";
import { Badge } from "@/shared/ui/badge";

interface SectionHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  badge?: string;
  children?: ReactNode;
}

export function SectionHero({ eyebrow, title, description, badge, children }: SectionHeroProps) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 md:px-8 md:py-20">
      <div className="max-w-2xl">
        <span className="text-sm font-semibold uppercase tracking-wide text-brand-text">
          {eyebrow}
        </span>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <h1 className="font-display text-4xl font-semibold text-foreground md:text-5xl">
            {title}
          </h1>
          {badge ? <Badge variant="soft">{badge}</Badge> : null}
        </div>
        <p className="mt-4 text-lg text-muted-foreground">{description}</p>
      </div>
      {children ? <div className="mt-10">{children}</div> : null}
    </section>
  );
}
