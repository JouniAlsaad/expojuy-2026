"use client";

import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { useId, useState } from "react";
import type { FaqCategoryGroupDto } from "@/modules/faq/application";
import { cn } from "@/shared/lib/utils";

interface FaqAccordionProps {
  groups: FaqCategoryGroupDto[];
}

export function FaqAccordion({ groups }: FaqAccordionProps) {
  const t = useTranslations("faq");
  const [openId, setOpenId] = useState<string | null>(null);
  const baseId = useId();

  if (groups.length === 0) {
    return <p className="text-muted-foreground">{t("empty")}</p>;
  }

  return (
    <div className="space-y-10">
      {groups.map((group) => (
        <section key={group.category} className="space-y-4">
          <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-brand-text">
            {t(`categories.${group.category}`)}
          </h2>
          <ul className="space-y-3">
            {group.items.map((item) => {
              const isOpen = openId === item.id;
              const panelId = `${baseId}-${item.id}`;
              return (
                <li key={item.id} className="rounded-lg border border-border bg-card shadow-soft">
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenId(isOpen ? null : item.id)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-medium text-card-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      <span>{item.question}</span>
                      <ChevronDown
                        className={cn(
                          "size-5 shrink-0 text-muted-foreground transition-transform",
                          isOpen && "rotate-180",
                        )}
                        aria-hidden
                      />
                    </button>
                  </h3>
                  <div id={panelId} hidden={!isOpen} className="px-5 pb-5 text-muted-foreground">
                    {item.answer}
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
