import { Sparkles } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Reveal } from "@/shared/components";
import { AssistantChat } from "./assistant-chat";

export async function AssistantSection() {
  const t = await getTranslations("assistant");

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-20 md:px-8">
      <Reveal>
        <div className="rounded-xl border border-border bg-card p-6 shadow-soft md:p-10">
          <span className="inline-flex items-center gap-2 font-semibold text-brand-text text-sm uppercase tracking-wide">
            <Sparkles className="size-4 shrink-0" aria-hidden />
            {t("badge")}
          </span>
          <h2 className="mt-3 font-display text-3xl text-foreground md:text-4xl">{t("title")}</h2>
          <p className="mt-2 max-w-2xl font-light text-muted-foreground">{t("subtitle")}</p>

          <div className="mt-8">
            <AssistantChat />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
