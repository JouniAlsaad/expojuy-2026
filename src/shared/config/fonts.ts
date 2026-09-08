import { Cormorant_Garamond, Jost } from "next/font/google";
import localFont from "next/font/local";

export const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: "300",
  display: "swap",
  variable: "--font-cormorant",
});

export const jost = Jost({
  subsets: ["latin"],
  weight: "300",
  display: "swap",
  variable: "--font-jost",
});

export const ambit = localFont({
  src: [
    { path: "../../../public/fonts/AmbitLight.woff2", weight: "300", style: "normal" },
    { path: "../../../public/fonts/AmbitRegular.woff2", weight: "400", style: "normal" },
    { path: "../../../public/fonts/AmbitSemiBold.woff2", weight: "600", style: "normal" },
    { path: "../../../public/fonts/AmbitBold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-ambit",
  display: "swap",
});
