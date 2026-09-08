import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { actionLinks, primaryNav } from "@/shared/config/navigation";
import { cn } from "@/shared/lib/utils";
import { buttonVariants } from "@/shared/ui/button";
import { HomeLink } from "./home-link";
import { MobileNav } from "./mobile-nav";
import { ThemeToggle } from "./theme-toggle";

export async function SiteHeader() {
  const t = await getTranslations("nav");
  const common = await getTranslations("common");
  const brand = await getTranslations("brand");

  return (
    <>
      <div className="hidden border-border border-b bg-muted lg:block">
        <div className="mx-auto flex max-w-6xl items-center justify-end gap-6 px-4 py-2 md:px-8">
          {actionLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-muted-foreground text-xs transition-colors hover:text-secondary"
            >
              {t(link.labelKey)}
              <ExternalLink className="size-3 shrink-0" aria-hidden />
            </a>
          ))}
        </div>
      </div>

      <header className="sticky top-0 z-40 border-border border-b bg-background/80 backdrop-blur">
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
              <span className="font-display font-semibold text-base text-foreground md:text-lg">
                {brand("name")}
              </span>
              <span className="hidden text-muted-foreground text-xs sm:block">
                {brand("tagline")}
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            <HomeLink />
            {primaryNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-medium text-muted-foreground text-sm transition-colors hover:text-secondary"
              >
                {t(link.labelKey)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/entradas"
              className={cn(
                buttonVariants({ variant: "primary", size: "sm" }),
                "hidden sm:inline-flex",
              )}
            >
              {common("tickets")}
            </Link>
            <ThemeToggle />
            <MobileNav />
          </div>
        </div>
      </header>
    </>
  );
}
