import Image from "next/image";
import type { SponsorDto } from "@/modules/sponsors/application";
import { cn } from "@/shared/lib/utils";

interface SponsorLogoProps {
  sponsor: SponsorDto;
}

const palette = [
  "bg-primary text-primary-foreground",
  "bg-secondary text-secondary-foreground",
  "bg-accent text-accent-foreground",
  "bg-accent-soft text-accent-soft-foreground",
] as const;

function cleanName(name: string): string {
  return name.replace(/\s*\(ficticio\)\s*/i, "").trim();
}

function monogram(name: string): string {
  return cleanName(name)
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();
}

function paletteIndex(id: string): number {
  let sum = 0;
  for (const char of id) {
    sum += char.charCodeAt(0);
  }
  return sum % palette.length;
}

export function SponsorLogo({ sponsor }: SponsorLogoProps) {
  const label = cleanName(sponsor.name);

  if (sponsor.logoUrl) {
    return (
      <Image
        src={sponsor.logoUrl}
        alt={label}
        width={160}
        height={48}
        unoptimized
        className="h-10 w-auto object-contain"
      />
    );
  }

  return (
    <span className="flex items-center gap-3">
      <span
        className={cn(
          "inline-grid size-11 shrink-0 place-items-center rounded-lg font-display font-bold text-base",
          palette[paletteIndex(sponsor.id)],
        )}
        aria-hidden
      >
        {monogram(sponsor.name)}
      </span>
      <span className="font-display font-semibold text-card-foreground text-sm leading-tight">
        {label}
      </span>
    </span>
  );
}
