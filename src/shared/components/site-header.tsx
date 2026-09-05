import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { primaryNav } from "@/shared/config/navigation";
import { cn } from "@/shared/lib/utils";
import { buttonVariants } from "@/shared/ui/button";
import { MobileNav } from "./mobile-nav";
import { ThemeToggle } from "./theme-toggle";

export async function SiteHeader() {
  const t = await getTranslations("nav");
  const common = await getTranslations("common");
  const brand = await getTranslations("brand");

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 md:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/brand/expojuy-isologotipo.svg"
            alt={`${brand("name")} — ${brand("tagline")}`}
            width={178}
            height={248}
            priority
            unoptimized
            className="h-9 w-auto md:h-10"
          />
          <span className="flex flex-col leading-tight" aria-hidden>
            <span className="font-display text-base font-semibold text-foreground md:text-lg">
              {brand("name")}
            </span>
            <span className="hidden text-xs text-muted-foreground sm:block">
              {brand("tagline")}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {primaryNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {t(link.labelKey)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/entradas"
            className={cn(
              buttonVariants({ variant: "primary", size: "sm" }),
              "hidden sm:inline-flex",
            )}
          >
            {common("tickets")}
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
