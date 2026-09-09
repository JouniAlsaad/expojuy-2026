import { Timer } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { EventInfoDto } from "@/modules/about";
import { Countdown, Reveal } from "@/shared/components";

interface CountdownSectionProps {
  event: EventInfoDto;
}

export async function CountdownSection({ event }: CountdownSectionProps) {
  const t = await getTranslations("home");

  return (
    <section
      id="cuenta-regresiva"
      className="mx-auto scroll-mt-24 py-20"
      style={{ width: "var(--width-showcase)", maxWidth: "var(--width-showcase)" }}
    >
      <Reveal>
        <div className="flex flex-col items-center gap-10 rounded-lg border border-secondary/30 bg-gradient-to-br from-secondary/10 via-accent/10 to-primary/10 px-4 py-10 text-center sm:px-8 md:px-12 md:py-14">
          <div className="flex max-w-2xl flex-col items-center gap-3">
            <span className="inline-flex items-center gap-2 font-semibold text-brand-text text-sm uppercase tracking-wide">
              <Timer className="size-4 shrink-0" aria-hidden />
              {t("countdown.sectionEyebrow")}
            </span>
            <h2 className="font-display text-3xl text-foreground md:text-4xl">
              {t("countdown.sectionTitle")}
            </h2>
            <p className="text-muted-foreground">
              {t("countdown.sectionSubtitle", { dates: event.datesLabel })}
            </p>
          </div>
          <Countdown targetIso={event.startDate} tone="surface" className="max-w-8xl" />
        </div>
      </Reveal>
    </section>
  );
}
