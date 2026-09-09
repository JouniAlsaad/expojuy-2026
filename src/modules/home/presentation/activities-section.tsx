import { HardHat, Luggage, Tractor } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Reveal } from "@/shared/components";

// Actividades productivas de la provincia, inspiradas en la referencia visual provista.
const activities = [
  { key: "agroindustry", icon: Tractor },
  { key: "mining", icon: HardHat },
  { key: "tourism", icon: Luggage },
] as const;

export async function ActivitiesSection() {
  const t = await getTranslations("home.activities");

  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-20 md:px-8">
      <Reveal className="mb-10 max-w-2xl">
        <h2 className="text-3xl text-foreground md:text-4xl">{t("title")}</h2>
        <p className="mt-3 text-muted-foreground">{t("subtitle")}</p>
      </Reveal>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {activities.map(({ key, icon: Icon }) => (
          <Reveal key={key} className="flex flex-col gap-4">
            <span className="inline-flex size-16 items-center justify-center rounded-xl bg-accent-soft text-accent-soft-foreground">
              <Icon className="size-9" aria-hidden strokeWidth={1.5} />
            </span>
            <h3 className="text-foreground text-xl md:text-2xl">
              {t(`items.${key}.title`)}
            </h3>
            <p className="text-muted-foreground">{t(`items.${key}.description`)}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
