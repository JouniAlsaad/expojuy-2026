import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Reveal } from "@/shared/components";
import { cn } from "@/shared/lib/utils";
import { buttonVariants } from "@/shared/ui/button";

export async function RouteAiBand() {
  const t = await getTranslations("home");

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-20 md:px-8">
      <Reveal>
        <div className="flex flex-col gap-5 rounded-lg border border-secondary/30 bg-gradient-to-br from-secondary/10 via-accent/10 to-primary/10 p-8 md:flex-row md:items-center md:justify-between md:p-10">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 font-semibold text-brand-text text-sm uppercase tracking-wide">
              <Sparkles className="size-4 shrink-0" aria-hidden />
              {t("routeCta.eyebrow")}
            </span>
            <h2 className="mt-3 font-display text-2xl text-foreground md:text-3xl">
              {t("routeCta.title")}
            </h2>
            <p className="mt-2 text-muted-foreground">{t("routeCta.description")}</p>
          </div>
          <Link
            href="/ruta-ia"
            className={cn(buttonVariants({ variant: "primary", size: "lg" }), "self-start")}
          >
            {t("routeCta.action")}
            <ArrowRight className="size-5" aria-hidden />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
