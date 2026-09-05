import { ArrowLeft, Calendar } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { createNewsRepository, GetArticleBySlugUseCase, GetNewsUseCase } from "@/modules/news";

interface NewsArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  const useCase = new GetNewsUseCase(createNewsRepository());
  const articles = await useCase.execute();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: NewsArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const useCase = new GetArticleBySlugUseCase(createNewsRepository());
  const article = await useCase.execute(slug);
  if (!article) {
    return {};
  }
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: { title: article.title, description: article.excerpt },
  };
}

export default async function NewsArticlePage({ params }: NewsArticlePageProps) {
  const { slug } = await params;
  const list = await getTranslations("news");
  const common = await getTranslations("common");

  const useCase = new GetArticleBySlugUseCase(createNewsRepository());
  const article = await useCase.execute(slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-16 md:px-8">
      <Link
        href="/noticias"
        className="inline-flex items-center gap-1 text-sm font-medium text-brand-text hover:underline"
      >
        <ArrowLeft className="size-4" aria-hidden />
        {list("backToList")}
      </Link>

      <header className="mt-6 space-y-4">
        <span className="inline-flex items-center rounded-full border border-transparent bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent-soft-foreground">
          {list(`categories.${article.category}`)}
        </span>
        <h1 className="font-display text-4xl text-foreground md:text-5xl">{article.title}</h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="size-4 shrink-0" aria-hidden />
          <time dateTime={article.publishedAt}>{article.publishedLabel}</time>
        </div>
      </header>

      <div className="mt-8 flex aspect-video items-center justify-center rounded-lg bg-gradient-to-br from-primary/15 via-accent/10 to-secondary/15">
        <span className="font-display text-sm font-semibold uppercase tracking-wide text-brand-text">
          {list(`categories.${article.category}`)}
        </span>
      </div>

      <div className="mt-8 space-y-4 text-lg text-muted-foreground">
        <p>{article.excerpt}</p>
      </div>

      <p className="mt-10 text-xs text-muted-foreground">{common("mockNotice")}</p>
    </article>
  );
}
