import type { SponsorDto } from "@/modules/sponsors/application";
import { cn } from "@/shared/lib/utils";
import { SponsorLogo, type SponsorLogoSize } from "./sponsor-logo";

interface SponsorCardProps {
  sponsor: SponsorDto;
  size?: SponsorLogoSize;
  className?: string;
}

export function SponsorCard({ sponsor, size, className }: SponsorCardProps) {
  const base = cn(
    "flex items-center justify-center rounded-xl border border-border bg-card p-8 shadow-soft transition-shadow hover:shadow-elevated",
    className,
  );

  if (sponsor.website) {
    return (
      <a
        href={sponsor.website}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={sponsor.name}
        className={base}
      >
        <SponsorLogo sponsor={sponsor} size={size} />
      </a>
    );
  }

  return (
    <div className={base}>
      <SponsorLogo sponsor={sponsor} size={size} />
    </div>
  );
}
