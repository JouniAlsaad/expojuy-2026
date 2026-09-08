import type { Metadata } from "next";
import Script from "next/script";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import type { ReactNode } from "react";
import {
  SiteCredit,
  SiteFooter,
  SiteHeader,
  SmoothScrollProvider,
  ThemeProvider,
} from "@/shared/components";
import { ambit } from "@/shared/config/fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "ExpoJuy 2026 · Feria multisectorial del NOA",
    template: "%s · ExpoJuy 2026",
  },
  description:
    "Sitio oficial de ExpoJuy 2026, la feria multisectorial más importante del NOA organizada por la Cámara de Comercio Exterior de Jujuy.",
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: "ExpoJuy 2026",
    title: "ExpoJuy 2026 · Feria multisectorial del NOA",
    description: "Descubrí, viví y disfrutá el legado de ExpoJuy 2026.",
    images: [{ url: "/brand/expojuy-logo.svg", alt: "ExpoJuy 2026" }],
  },
  icons: {
    icon: [{ url: "/brand/expojuy-isologotipo.svg", type: "image/svg+xml" }],
  },
};

const themeScript = `(function(){try{var t=localStorage.getItem('expojuy-theme');if(t==='dark'){document.documentElement.classList.add('dark');}}catch(e){}})();`;

interface RootLayoutProps {
  children: ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning className={ambit.variable}>
      <head>
        <Script id="theme-bootstrap" strategy="beforeInteractive">
          {themeScript}
        </Script>
      </head>
      <body
        suppressHydrationWarning
        className="flex min-h-dvh flex-col bg-background text-foreground antialiased"
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider>
            <SmoothScrollProvider>
              <SiteHeader />
              <main className="flex flex-1 flex-col">{children}</main>
              <SiteFooter />
              <SiteCredit />
            </SmoothScrollProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
