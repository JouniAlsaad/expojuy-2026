import { ExternalLink } from "lucide-react";
import type { SponsorDto } from "@/modules/sponsors/application";

interface SponsorCardProps {
  sponsor: SponsorDto;
}

function monogram(name: string): string {
  return name
    .replace(/\(ficticio\)/gi, "")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();
}

export function SponsorCard({ sponsor }: SponsorCardProps) {
  const content = (
    <span className="flex w-full items-center gap-3">
      <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-md bg-muted font-display text-sm font-semibold text-brand-text">
        {monogram(sponsor.name)}
      </span>
      <span className="flex-1 text-sm font-medium text-card-foreground">{sponsor.name}</span>
      {sponsor.website ? (
        <ExternalLink className="size-4 shrink-0 text-muted-foreground" aria-hidden />
      ) : null}
    </span>
  );

  const className =
    "flex items-center rounded-lg border border-border bg-card p-4 shadow-soft transition-shadow hover:shadow-elevated";

  if (sponsor.website) {
    return (
      <a href={sponsor.website} target="_blank" rel="noopener noreferrer" className={className}>
        {content}
      </a>
    );
  }

  return <div className={className}>{content}</div>;
}
