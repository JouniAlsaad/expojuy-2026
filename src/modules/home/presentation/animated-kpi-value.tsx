"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

interface AnimatedKpiValueProps {
  value: number;
  translationKey: string;
  className?: string;
}

const durationMs = 1600;

function easeOutCubic(progress: number): number {
  return 1 - (1 - progress) ** 3;
}

export function AnimatedKpiValue({ value, translationKey, className }: AnimatedKpiValueProps) {
  const t = useTranslations("home");
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }

    let frame = 0;
    let start = 0;

    const step = (timestamp: number) => {
      if (!start) {
        start = timestamp;
      }
      const progress = Math.min((timestamp - start) / durationMs, 1);
      setDisplay(Math.round(easeOutCubic(progress) * value));
      if (progress < 1) {
        frame = window.requestAnimationFrame(step);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            frame = window.requestAnimationFrame(step);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {t(`about.kpis.${translationKey}`, { value: display })}
    </span>
  );
}
