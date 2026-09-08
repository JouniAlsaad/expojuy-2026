import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { cormorant, jost } from "@/shared/config/fonts";
import { cn } from "@/shared/lib/utils";

export async function SiteCredit() {
  const t = await getTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <div className="border-neutral-50/10 border-t bg-sintaxia-bg text-sintaxia-muted">
      <div className="mx-auto flex max-w-8xl flex-col items-center gap-4 px-4 py-8 md:flex-row md:justify-between md:px-8">
        <span
          className={cn(jost.className, "text-sintaxia-muted text-xs uppercase")}
          style={{ letterSpacing: "0.2em" }}
        >
          {t("builtBy")}
        </span>

        <div className="flex items-center gap-4">
          <Image
            src="/brand/sintaxia-marca-animada.svg"
            alt=""
            width={64}
            height={64}
            unoptimized
            className="h-16 w-16 shrink-0"
          />
          <span className="flex flex-col leading-tight">
            <span
              className={cn(cormorant.className, "text-sintaxia-fg text-xl")}
              style={{ letterSpacing: "0.3em" }}
            >
              {t("studioName")}
            </span>
            <span
              className={cn(jost.className, "text-sintaxia-muted text-xs")}
              style={{ letterSpacing: "0.18em" }}
            >
              {t("studioTagline")}
            </span>
            <span className={cn(jost.className, "mt-1 text-sintaxia-muted/70 text-xs")}>
              {t("studioCopyright", { year })}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
