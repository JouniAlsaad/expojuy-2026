import { ExternalLink } from "lucide-react";
import type { SponsorDto } from "@/modules/sponsors/application";
import { SponsorLogo } from "./sponsor-logo";

interface SponsorCardProps {
  sponsor: SponsorDto;
}

export function SponsorCard({ sponsor }: SponsorCardProps) {
  const className =
    "flex items-center justify-between gap-3 rounded-lg border border-border bg-card p-4 shadow-soft transition-shadow hover:shadow-elevated";

  const content = (
    <>
      <SponsorLogo sponsor={sponsor} />
      {sponsor.website ? (
        <ExternalLink className="size-4 shrink-0 text-muted-foreground" aria-hidden />
      ) : null}
    </>
  );

  if (sponsor.website) {
    return (
      <a href={sponsor.website} target="_blank" rel="noopener noreferrer" className={className}>
        {content}
      </a>
    );
  }

  return <div className={className}>{content}</div>;
}
