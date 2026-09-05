import { ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import type { NewsArticleDto } from "@/modules/news/application";

interface NewsCardProps {
  article: NewsArticleDto;
}

export async function NewsCard({ article }: NewsCardProps) {
  const t = await getTranslations("news");

  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-soft transition-shadow hover:shadow-elevated">
      <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-primary/15 via-accent/10 to-secondary/15">
        <span className="font-display text-sm font-semibold uppercase tracking-wide text-brand-text">
          {t(`categories.${article.category}`)}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="size-4 shrink-0" aria-hidden />
          <time dateTime={article.publishedAt}>{article.publishedLabel}</time>
        </div>
        <h3 className="font-display text-lg text-card-foreground">{article.title}</h3>
        <p className="text-sm text-muted-foreground">{article.excerpt}</p>
        <Link
          href={`/noticias/${article.slug}`}
          className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-brand-text hover:underline"
        >
          {t("readMore")}
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
    </article>
  );
}
