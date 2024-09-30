import clsx from "clsx";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google';

import { GOOGLE_ANALYTICS_ID } from "@/environment";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wordle - Games When Bored",
  description: "An unlimited play of the puzzle game Wordle that you can play when bored. Play as many times as you like, and there are over 50,000 words to guess",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const layoutClasses = clsx(
    inter.className,
    "dark:bg-stone-900"
  );

  return (
    <html lang="en">
      <body className={layoutClasses}>
        {children}
        {GOOGLE_ANALYTICS_ID && <GoogleAnalytics gaId={GOOGLE_ANALYTICS_ID} />}
      </body>
    </html>
  );
}
