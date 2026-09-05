import type { ReactNode } from "react";

interface PagePlaceholderProps {
  title: string;
  description: string;
  note?: string;
  children?: ReactNode;
}

export function PagePlaceholder({ title, description, note, children }: PagePlaceholderProps) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 md:px-8">
      <header className="max-w-2xl">
        <h1 className="text-4xl text-foreground">{title}</h1>
        <p className="mt-3 text-lg text-muted-foreground">{description}</p>
      </header>
      <div className="mt-10">
        {children ?? (
          <p className="rounded-lg border border-dashed border-border bg-muted/40 p-8 text-sm text-muted-foreground">
            {note}
          </p>
        )}
      </div>
    </section>
  );
}
