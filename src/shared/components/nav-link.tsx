"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { cn } from "@/shared/lib/utils";

interface NavLinkProps {
  href: string;
  children: ReactNode;
}

export function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "group relative py-1 font-medium text-sm transition-colors duration-200 ease-soft motion-safe:hover:-translate-y-px",
        isActive ? "text-secondary" : "text-muted-foreground hover:text-secondary",
      )}
    >
      {children}
      <span
        aria-hidden
        className={cn(
          "absolute inset-x-0 -bottom-0.5 h-0.5 origin-left rounded-full bg-gradient-to-r from-secondary to-primary transition-transform duration-300 ease-brand motion-reduce:transition-none",
          isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
        )}
      />
    </Link>
  );
}
