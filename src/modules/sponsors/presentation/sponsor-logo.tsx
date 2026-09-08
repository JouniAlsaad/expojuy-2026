import Image from "next/image";
import type { ReactNode } from "react";
import type { SponsorDto } from "@/modules/sponsors/application";
import { cn } from "@/shared/lib/utils";

export type SponsorLogoSize = "sm" | "md" | "lg";

interface SponsorLogoProps {
  sponsor: SponsorDto;
  size?: SponsorLogoSize;
}

const accents = ["text-brand-text", "text-secondary", "text-accent"] as const;

const sizeMap: Record<SponsorLogoSize, { mark: string; text: string; gap: string }> = {
  sm: { mark: "size-7", text: "text-base", gap: "gap-1.5" },
  md: { mark: "size-9", text: "text-xl", gap: "gap-2" },
  lg: { mark: "size-12", text: "text-3xl", gap: "gap-3" },
};

const marks: readonly ReactNode[] = [
  <path key="peaks" d="M2 20 L8 8 L12 14 L16 6 L22 20 Z" fill="currentColor" />,
  <circle key="ring" cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="3" />,
  <path
    key="hex"
    d="M12 2 L21 7 V17 L12 22 L3 17 V7 Z"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinejoin="round"
  />,
  <g key="bars" fill="currentColor">
    <rect x="3" y="14" width="4.5" height="7" rx="1" />
    <rect x="9.75" y="9" width="4.5" height="12" rx="1" />
    <rect x="16.5" y="4" width="4.5" height="17" rx="1" />
  </g>,
  <g key="mosaic" fill="currentColor">
    <rect x="3" y="3" width="8" height="8" rx="1.8" />
    <rect x="13" y="3" width="8" height="8" rx="1.8" />
    <rect x="3" y="13" width="8" height="8" rx="1.8" />
  </g>,
  <path
    key="chevron"
    d="M4 16 L12 7 L20 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  />,
];

function cleanName(name: string): string {
  return name.replace(/\s*\(ficticio\)\s*/i, "").trim();
}

function hash(id: string): number {
  let sum = 0;
  for (const char of id) {
    sum += char.charCodeAt(0);
  }
  return sum;
}

export function SponsorLogo({ sponsor, size = "md" }: SponsorLogoProps) {
  const label = cleanName(sponsor.name);

  if (sponsor.logoUrl) {
    return (
      <Image
        src={sponsor.logoUrl}
        alt={label}
        width={220}
        height={72}
        unoptimized
        className="h-14 w-auto object-contain"
      />
    );
  }

  const seed = hash(sponsor.id);
  const accent = accents[seed % accents.length];
  const mark = marks[(seed + 1) % marks.length];
  const dims = sizeMap[size];
  const words = label.split(/\s+/);
  const tail = words[words.length - 1];
  const head = words.slice(0, -1).join(" ");

  return (
    <div className={cn("flex flex-col items-center text-center", dims.gap)}>
      <svg viewBox="0 0 24 24" className={cn(dims.mark, accent)} role="presentation">
        {mark}
      </svg>
      <span
        className={cn("font-display font-bold uppercase leading-tight tracking-tight", dims.text)}
      >
        {head ? <span className="text-foreground">{head} </span> : null}
        <span className={accent}>{tail}</span>
      </span>
    </div>
  );
}
