"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface CountdownProps {
  targetIso: string;
}

interface Remaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
}

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

export function Countdown({ targetIso }: CountdownProps) {
  const t = useTranslations("home.countdown");
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
    return null;
  }

  if (remaining.done) {
    return <p className="text-sm font-medium text-brand-text">{t("live")}</p>;
  }

  const units: Array<{ key: string; value: number }> = [
    { key: "days", value: remaining.days },
    { key: "hours", value: remaining.hours },
    { key: "minutes", value: remaining.minutes },
    { key: "seconds", value: remaining.seconds },
  ];

  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {t("label")}
      </p>
      <ul className="flex gap-3">
        {units.map((unit) => (
          <li
            key={unit.key}
            className="flex min-w-16 flex-col items-center rounded-lg border border-border bg-card px-3 py-2 shadow-soft"
          >
            <span className="font-display text-2xl font-semibold text-foreground tabular-nums">
              {String(unit.value).padStart(2, "0")}
            </span>
            <span className="text-xs text-muted-foreground">{t(unit.key)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
