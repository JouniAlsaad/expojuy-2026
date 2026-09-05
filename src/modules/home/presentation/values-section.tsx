import { Cpu, Factory, GraduationCap, Handshake, Lightbulb, LineChart } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Reveal } from "@/shared/components";

const values = [
  { key: "innovation", icon: Lightbulb },
  { key: "technology", icon: Cpu },
  { key: "production", icon: Factory },
  { key: "development", icon: LineChart },
  { key: "business", icon: Handshake },
  { key: "knowledge", icon: GraduationCap },
] as const;

export async function ValuesSection() {
  const t = await getTranslations("home");

  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-20 md:px-8">
      <Reveal className="mb-10 max-w-2xl">
        <h2 className="text-3xl text-foreground md:text-4xl">{t("values.title")}</h2>
        <p className="mt-3 text-muted-foreground">{t("values.subtitle")}</p>
      </Reveal>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {values.map(({ key, icon: Icon }) => (
          <Reveal
            key={key}
            className="flex h-full flex-col gap-3 rounded-lg border border-border bg-card p-6 shadow-soft"
          >
            <span className="inline-flex size-11 items-center justify-center rounded-md bg-accent-soft text-accent-soft-foreground">
              <Icon className="size-6" aria-hidden />
            </span>
            <h3 className="text-card-foreground text-lg">{t(`values.items.${key}.title`)}</h3>
            <p className="text-muted-foreground text-sm">{t(`values.items.${key}.description`)}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
