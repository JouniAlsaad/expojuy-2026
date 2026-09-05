import type { ReactNode } from "react";
import { cn } from "@/shared/lib/utils";

interface FilterChipProps {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}

export function FilterChip({ active, onClick, children }: FilterChipProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        active
          ? "border-transparent bg-secondary text-secondary-foreground"
          : "border-border bg-background text-muted-foreground hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}
