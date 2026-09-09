"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { cn } from "@/shared/lib/utils";

type CountdownTone = "surface" | "onImage";

interface CountdownProps {
  targetIso: string;
  tone?: CountdownTone;
  className?: string;
}

interface Remaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
}

const toneStyles: Record<
  CountdownTone,
  { label: string; tile: string; value: string; unit: string; skeleton: string }
> = {
  surface: {
    label: "text-brand-text",
    tile: "border-border bg-card shadow-soft",
    value: "text-foreground",
    unit: "text-muted-foreground",
    skeleton: "border-border bg-card/50",
  },
  onImage: {
    label: "text-primary",
    tile: "border-neutral-50/15 bg-neutral-950/40 backdrop-blur",
    value: "text-neutral-50",
    unit: "text-neutral-200",
    skeleton: "border-neutral-50/15 bg-neutral-950/30",
  },
};

function computeRemaining(target: number): Remaining {
  const diff = target - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  }
  const totalSeconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    done: false,
  };
}

export function Countdown({ targetIso, tone = "surface", className }: CountdownProps) {
  const t = useTranslations("home.countdown");
  const styles = toneStyles[tone];
  const [remaining, setRemaining] = useState<Remaining | null>(null);

  useEffect(() => {
    const target = new Date(`${targetIso}T00:00:00`).getTime();
    setRemaining(computeRemaining(target));
    const interval = window.setInterval(() => {
      setRemaining(computeRemaining(target));
    }, 1000);
    return () => window.clearInterval(interval);
  }, [targetIso]);

  if (!remaining) {
    return (
      <div
        className={cn("h-24 w-full max-w-md rounded-2xl border", styles.skeleton, className)}
        aria-hidden
      />
    );
  }

  if (remaining.done) {
    return (
      <p className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 font-semibold text-brand-text text-sm">
        <span className="inline-block size-2 rounded-full bg-primary" aria-hidden />
        {t("live")}
      </p>
    );
  }

  const units: Array<{ key: string; value: number }> = [
    { key: "days", value: remaining.days },
    { key: "hours", value: remaining.hours },
    { key: "minutes", value: remaining.minutes },
    { key: "seconds", value: remaining.seconds },
  ];

  return (
    <div className={cn("w-full max-w-md", className)}>
      <p
        className={cn(
          "mb-3 inline-flex items-center gap-2 font-semibold text-xs uppercase tracking-widest",
          styles.label,
        )}
      >
        <span
          className="inline-block size-2 rounded-full bg-primary motion-safe:animate-pulse"
          aria-hidden
        />
        {t("label")}
      </p>
      <ul className="grid grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
        {units.map((unit) => (
          <li
            key={unit.key}
            className={cn(
              "flex flex-col items-center rounded-xl border px-2 py-3 sm:py-4 lg:py-6",
              styles.tile,
            )}
          >
            <span
              className={cn(
                "font-display font-bold text-3xl tabular-nums sm:text-4xl md:text-5xl lg:text-6xl",
                styles.value,
              )}
            >
              {String(unit.value).padStart(2, "0")}
            </span>
            <span className={cn("mt-1 text-xs uppercase tracking-wide", styles.unit)}>
              {t(unit.key)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
