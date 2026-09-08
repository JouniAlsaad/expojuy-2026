import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import {
  createSponsorRepository,
  GetSponsorsByTierUseCase,
  SponsorsBoard,
} from "@/modules/sponsors";
import { PagePlaceholder } from "@/shared/components";
import { cn } from "@/shared/lib/utils";
import { buttonVariants } from "@/shared/ui/button";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.sponsors");
  const title = t("title");
  const description = t("description");
  return { title, description, openGraph: { title, description } };
}

export default async function SponsorsPage() {
  const page = await getTranslations("pages.sponsors");
  const list = await getTranslations("sponsors");
  const common = await getTranslations("common");

  const repository = createSponsorRepository();
  const useCase = new GetSponsorsByTierUseCase(repository);
  const groups = await useCase.execute();
  const sponsors = groups.flatMap((group) => group.sponsors);

  return (
    <PagePlaceholder title={page("title")} description={page("description")}>
      <div className="space-y-12">
        <div className="max-w-2xl">
          <h2 className="text-2xl text-foreground">{list("listTitle")}</h2>
          <p className="mt-2 text-muted-foreground">{list("listDescription")}</p>
        </div>

        <SponsorsBoard sponsors={sponsors} />

        <div className="flex flex-col gap-4 rounded-lg border border-border bg-muted/40 p-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <h2 className="font-display text-xl text-foreground">{list("cta.title")}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{list("cta.description")}</p>
          </div>
          <Link
            href="/contacto"
            className={cn(buttonVariants({ variant: "primary", size: "lg" }), "self-start")}
          >
            {list("cta.action")}
          </Link>
        </div>

        <p className="text-xs text-muted-foreground">{common("mockNotice")}</p>
      </div>
    </PagePlaceholder>
  );
}
