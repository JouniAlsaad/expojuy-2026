import { Compass, Radio, Sparkles } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Reveal } from "@/shared/components";

const phases = [
  { key: "discover", icon: Compass },
  { key: "live", icon: Radio },
  { key: "legacy", icon: Sparkles },
] as const;

export async function PhasesSection() {
  const t = await getTranslations("home");

  return (
    <section className="border-border border-t bg-muted/30">
      <div className="mx-auto w-full max-w-6xl px-4 py-20 md:px-8">
        <Reveal className="mb-10 max-w-2xl">
          <h2 className="text-3xl text-foreground md:text-4xl">{t("phases.title")}</h2>
          <p className="mt-3 text-muted-foreground">{t("phases.subtitle")}</p>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {phases.map(({ key, icon: Icon }) => (
            <Reveal
              key={key}
              className="flex h-full flex-col gap-3 rounded-lg border border-border bg-card p-6 shadow-soft transition-shadow hover:shadow-cyan"
            >
              <span className="inline-flex size-11 items-center justify-center rounded-md bg-primary/10 text-primary">
                <Icon className="size-6" aria-hidden />
              </span>
              <span className="font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                {t(`phases.${key}.tag`)}
              </span>
              <h3 className="text-card-foreground text-xl">{t(`phases.${key}.title`)}</h3>
              <p className="text-muted-foreground text-sm">{t(`phases.${key}.description`)}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
