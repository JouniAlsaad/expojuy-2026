import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Reveal } from "@/shared/components";
import { cormorant, jost } from "@/shared/config/fonts";
import { cn } from "@/shared/lib/utils";

export async function ClosingImageSection() {
  const t = await getTranslations("closing");

  return (
    <section
      className="mx-auto pt-20 pb-8 md:pb-20"
      style={{ width: "var(--width-closing)", maxWidth: "var(--width-closing)" }}
    >
      <Reveal>
        <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border shadow-elevated md:aspect-ultrawide">
          <Image
            src="/images/Img galeria/4.jpeg"
            alt=""
            fill
            sizes="80vw"
            className="object-cover"
            style={{ objectPosition: "50% 62%" }}
          />

          <div className="absolute top-2 right-2 z-10 flex items-center gap-1.5 rounded-md border border-neutral-50/10 bg-sintaxia-bg/80 px-2 py-1 md:top-auto md:right-4 md:bottom-4 md:gap-3 md:bg-sintaxia-bg/70 md:px-3 md:py-2 md:backdrop-blur-sm">
            <Image
              src="/brand/sintaxia-marca-estatica.svg"
              alt=""
              width={32}
              height={32}
              unoptimized
              className="size-5 shrink-0 md:size-8"
            />
            <span className="flex flex-col leading-tight">
              <span
                className={cn(cormorant.className, "text-sintaxia-fg text-xs md:text-base")}
                style={{ letterSpacing: "0.22em" }}
              >
                {t("watermarkName")}
              </span>
              <span
                className={cn(jost.className, "text-2xs text-sintaxia-muted md:text-xs")}
                style={{ letterSpacing: "0.1em" }}
              >
                {t("watermarkLegend")}
              </span>
            </span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
