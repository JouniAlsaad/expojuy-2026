import { Timer } from "lucide-react";
import Image from "next/image";
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
        <div className="relative isolate flex flex-col items-center gap-10 overflow-hidden rounded-lg border border-neutral-50/15 px-4 py-10 text-center sm:px-8 md:px-12 md:py-14">
          <Image
            src="/images/imgRecursos/fondoContador.jpeg"
            alt=""
            fill
            sizes="(min-width: 1024px) 60rem, 100vw"
            className="-z-10 object-cover object-center"
          />
          <div
            aria-hidden
            className="-z-10 absolute inset-0 bg-gradient-to-br from-neutral-950/85 via-neutral-950/70 to-neutral-950/55"
          />
          <div className="flex max-w-2xl flex-col items-center gap-3">
            <span className="inline-flex items-center gap-2 font-semibold text-primary text-sm uppercase tracking-wide">
              <Timer className="size-4 shrink-0" aria-hidden />
              {t("countdown.sectionEyebrow")}
            </span>
            <h2 className="font-display text-3xl text-neutral-50 md:text-4xl">
              {t("countdown.sectionTitle")}
            </h2>
            <p className="text-neutral-200">
              {t("countdown.sectionSubtitle", { dates: event.datesLabel })}
            </p>
          </div>
          <Countdown targetIso={event.startDate} tone="onImage" className="max-w-8xl" />
        </div>
      </Reveal>
    </section>
  );
}
