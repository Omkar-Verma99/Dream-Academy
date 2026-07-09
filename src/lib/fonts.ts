import { Plus_Jakarta_Sans, Source_Serif_4 } from "next/font/google";

export const display = Source_Serif_4({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  display: "swap",
  preload: true,
  weight: ["400", "500", "600", "700"],
});

export const sans = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
  weight: ["400", "500", "600", "700"],
});

/* Back-compat aliases used by older imports */
export const fraunces = display;
export const interTight = sans;
