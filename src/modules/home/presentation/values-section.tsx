import {
  Cpu,
  Factory,
  Globe,
  GraduationCap,
  Handshake,
  Leaf,
  Lightbulb,
  LineChart,
  Mountain,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Reveal } from "@/shared/components";
import { cn } from "@/shared/lib/utils";

interface ValueItem {
  key: string;
  icon: LucideIcon;
  badge: string;
  watermark: string;
  hoverShadow: string;
}

const values: ValueItem[] = [
  {
    key: "innovation",
    icon: Lightbulb,
    badge: "bg-cat-mineria-energia",
    watermark: "text-cat-mineria-energia",
    hoverShadow: "hover:shadow-cat-mineria-energia",
  },
  {
    key: "technology",
    icon: Cpu,
    badge: "bg-cat-tecnologia",
    watermark: "text-cat-tecnologia",
    hoverShadow: "hover:shadow-cat-tecnologia",
  },
  {
    key: "production",
    icon: Factory,
    badge: "bg-cat-artesanias",
    watermark: "text-cat-artesanias",
    hoverShadow: "hover:shadow-cat-artesanias",
  },
  {
    key: "development",
    icon: LineChart,
    badge: "bg-cat-turismo",
    watermark: "text-cat-turismo",
    hoverShadow: "hover:shadow-cat-turismo",
  },
  {
    key: "business",
    icon: Handshake,
    badge: "bg-cat-agroindustria",
    watermark: "text-cat-agroindustria",
    hoverShadow: "hover:shadow-cat-agroindustria",
  },
  {
    key: "knowledge",
    icon: GraduationCap,
    badge: "bg-cat-gastronomia",
    watermark: "text-cat-gastronomia",
    hoverShadow: "hover:shadow-cat-gastronomia",
  },
];

const moreValues: ValueItem[] = [
  {
    key: "culture",
    icon: Mountain,
    badge: "bg-cat-servicios",
    watermark: "text-cat-servicios",
    hoverShadow: "hover:shadow-cat-servicios",
  },
  {
    key: "sustainability",
    icon: Leaf,
    badge: "bg-cat-agroindustria",
    watermark: "text-cat-agroindustria",
    hoverShadow: "hover:shadow-cat-agroindustria",
  },
  {
    key: "trade",
    icon: Globe,
    badge: "bg-cat-turismo",
    watermark: "text-cat-turismo",
    hoverShadow: "hover:shadow-cat-turismo",
  },
];

export async function ValuesSection() {
  const t = await getTranslations("home");

  const renderCard = ({ key, icon: Icon, badge, watermark, hoverShadow }: ValueItem, path: string) => (
    <Reveal
      key={key}
      className={cn(
        "group relative flex h-full flex-col gap-4 overflow-hidden rounded-xl border border-border bg-card p-8 shadow-soft transition duration-300 ease-brand hover:-translate-y-1",
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
      <h3 className="relative text-card-foreground text-2xl">
        {t(`values.${path}.${key}.title`)}
      </h3>
      <p className="relative text-muted-foreground">
        {t(`values.${path}.${key}.description`)}
      </p>
    </Reveal>
  );

  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-20 md:px-8">
      <Reveal className="mb-10 max-w-2xl">
        <h2 className="text-3xl text-foreground md:text-4xl">{t("values.title")}</h2>
        <p className="mt-3 text-muted-foreground">{t("values.subtitle")}</p>
      </Reveal>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {values.map((item) => renderCard(item, "items"))}
      </div>
      <Reveal className="mt-16 mb-10 max-w-2xl">
        <h2 className="text-3xl text-foreground md:text-4xl">{t("values.moreTitle")}</h2>
      </Reveal>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {moreValues.map((item) => renderCard(item, "moreItems"))}
      </div>
    </section>
  );
}
