"use client";

import { Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "@/shared/hooks/use-theme";
import { Button } from "@/shared/ui/button";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const t = useTranslations("a11y");

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? t("switchToLight") : t("switchToDark")}
    >
      {theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
    </Button>
  );
}
