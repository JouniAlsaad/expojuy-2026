"use client";

import { MorphIcon } from "morphicons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { homeIcon } from "@/shared/config/morph-icons";

export function HomeLink() {
  const pathname = usePathname();
  const labels = useTranslations("a11y");

  if (pathname === "/") {
    return null;
  }

  return (
    <Link
      href="/"
      aria-label={labels("goHome")}
      className="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-secondary"
    >
      <MorphIcon icon={homeIcon} size={20} strokeWidth={2} spring="snappy" />
    </Link>
  );
}
