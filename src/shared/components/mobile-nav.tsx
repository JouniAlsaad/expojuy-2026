"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MorphIcon } from "morphicons/react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import { fadeInUp, staggerContainer } from "@/design-system/animations";
import { closeIcon, menuIcon } from "@/shared/config/morph-icons";
import { actionLinks, primaryNav } from "@/shared/config/navigation";
import { cn } from "@/shared/lib/utils";
import { buttonVariants } from "@/shared/ui/button";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("nav");
  const labels = useTranslations("a11y");

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) {
      return;
    }
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    document.body.classList.add("overflow-hidden");
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.classList.remove("overflow-hidden");
      window.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((previous) => !previous)}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={open ? labels("closeMenu") : labels("openMenu")}
        className="inline-flex size-10 items-center justify-center rounded-md text-foreground transition-colors hover:bg-muted"
      >
        <MorphIcon icon={open ? closeIcon : menuIcon} size={24} strokeWidth={2} spring="snappy" />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.nav
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-1 flex-col justify-center gap-2 px-8 py-20"
            >
              {primaryNav.map((link) => (
                <motion.div key={link.href} variants={fadeInUp}>
                  <Link
                    href={link.href}
                    onClick={close}
                    className="block py-2 font-display text-3xl text-foreground transition-colors hover:text-secondary"
                  >
                    {t(link.labelKey)}
                  </Link>
                </motion.div>
              ))}

              <motion.div variants={fadeInUp} className="mt-6 flex flex-col gap-3">
                {actionLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={close}
                    className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full")}
                  >
                    {t(link.labelKey)}
                  </a>
                ))}
                <Link
                  href="/entradas"
                  onClick={close}
                  className={cn(buttonVariants({ variant: "primary", size: "lg" }), "w-full")}
                >
                  {t("tickets")}
                </Link>
              </motion.div>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
