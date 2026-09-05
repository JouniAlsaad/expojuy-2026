import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { cn } from "@/shared/lib/utils";
import { buttonVariants } from "@/shared/ui/button";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <section className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center gap-6 px-4 py-20 text-center md:px-8">
      <Image
        src="/brand/expojuy-isologotipo.svg"
        alt="ExpoJuy 2026"
        width={178}
        height={248}
        priority
        unoptimized
        className="h-24 w-auto"
      />
      <span className="font-display text-7xl font-bold text-foreground md:text-8xl">404</span>
      <h1 className="font-display text-2xl font-semibold text-foreground md:text-3xl">
        {t("title")}
      </h1>
      <p className="max-w-md text-muted-foreground">{t("description")}</p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link href="/" className={cn(buttonVariants({ variant: "primary", size: "lg" }))}>
          {t("cta.primary")}
        </Link>
        <Link
          href="/expositores"
          className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
        >
          {t("cta.secondary")}
        </Link>
      </div>
    </section>
  );
}
