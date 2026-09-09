import { CalendarRange, Maximize2, Store, Users } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { EventInfoDto } from "@/modules/about";
import { Reveal } from "@/shared/components";
import { AnimatedKpiValue } from "./animated-kpi-value";

interface AboutSectionProps {
  event: EventInfoDto;
}

const kpis = [
  { key: "edition", icon: CalendarRange, value: (event: EventInfoDto) => event.edition },
  { key: "stands", icon: Store, value: (event: EventInfoDto) => event.stats.stands },
  { key: "surface", icon: Maximize2, value: (event: EventInfoDto) => event.stats.surfaceM2 },
  { key: "visitors", icon: Users, value: (event: EventInfoDto) => event.stats.visitors },
] as const;

export async function AboutSection({ event }: AboutSectionProps) {
  const t = await getTranslations("home");

  return (
    <section id="sobre" className="mx-auto w-full max-w-6xl scroll-mt-24 px-4 py-20 md:px-8">
      <Reveal className="mb-10 max-w-2xl">
        <span className="font-semibold text-brand-text text-sm uppercase tracking-wide">
          {t("about.eyebrow")}
        </span>
        <h2 className="mt-3 text-3xl text-foreground md:text-4xl">{t("about.title")}</h2>
        <p className="mt-3 text-muted-foreground">{t("about.description")}</p>
      </Reveal>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map(({ key, icon: Icon, value }) => (
          <Reveal
            key={key}
            className="flex flex-col gap-2 rounded-lg border border-border bg-card p-6 shadow-soft"
          >
            <Icon className="size-6 text-brand-text" aria-hidden />
            <AnimatedKpiValue
              translationKey={key}
              value={value(event)}
              className="font-display font-semibold text-3xl text-foreground tabular-nums"
            />
            <span className="text-muted-foreground text-sm">{t(`about.labels.${key}`)}</span>
          </Reveal>
        ))}
      </div>
      <p className="mt-4 text-muted-foreground text-xs">{t("about.preliminary")}</p>
    </section>
  );
}
