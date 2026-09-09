import { Gem, MountainSnow, Wheat } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Reveal } from "@/shared/components";
import { cn } from "@/shared/lib/utils";

const activities = [
  {
    key: "agroindustry",
    icon: Wheat,
    badge: "bg-cat-agroindustria",
    watermark: "text-cat-agroindustria",
    hoverShadow: "hover:shadow-cat-agroindustria",
  },
  {
    key: "mining",
    icon: Gem,
    badge: "bg-cat-mineria-energia",
    watermark: "text-cat-mineria-energia",
    hoverShadow: "hover:shadow-cat-mineria-energia",
  },
  {
    key: "tourism",
    icon: MountainSnow,
    badge: "bg-cat-turismo",
    watermark: "text-cat-turismo",
    hoverShadow: "hover:shadow-cat-turismo",
  },
] as const;

export async function ActivitiesSection() {
  const t = await getTranslations("home.activities");

  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-20 md:px-8">
      <Reveal className="mb-10 max-w-2xl">
        <h2 className="text-3xl text-foreground md:text-4xl">{t("title")}</h2>
        <p className="mt-3 text-muted-foreground">{t("subtitle")}</p>
      </Reveal>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {activities.map(({ key, icon: Icon, badge, watermark, hoverShadow }) => (
          <Reveal
            key={key}
            className={cn(
              "group relative flex flex-col gap-4 overflow-hidden rounded-xl border border-border bg-card p-8 shadow-soft transition duration-300 ease-brand hover:-translate-y-1",
              hoverShadow,
            )}
          >
            <Icon
              aria-hidden
              strokeWidth={1}
              className={cn(
                "-top-6 -right-6 pointer-events-none absolute size-40 opacity-40 transition duration-300 ease-brand group-hover:scale-110",
                watermark,
              )}
            />
            <span
              className={cn(
                "relative inline-flex size-20 items-center justify-center rounded-2xl text-foreground shadow-soft transition duration-300 ease-brand group-hover:scale-105",
                badge,
              )}
            >
              <Icon className="size-10" aria-hidden strokeWidth={1.5} />
            </span>
            <h3 className="relative text-foreground text-2xl">
              {t(`items.${key}.title`)}
            </h3>
            <p className="relative text-muted-foreground">
              {t(`items.${key}.description`)}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
