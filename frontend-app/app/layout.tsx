import clsx from "clsx";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google';

import Adsense from "./components/adsense/adsense";
import { GOOGLE_ADSENSE_PUB_ID, GOOGLE_ANALYTICS_ID } from "./environment/environment-variables";

import "./globals.css";
import Head from "next/head";

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
      <Head>
        {GOOGLE_ADSENSE_PUB_ID && <Adsense pId={GOOGLE_ADSENSE_PUB_ID} />}
      </Head>
      <body className={layoutClasses}>
        {children}
        {GOOGLE_ANALYTICS_ID && <GoogleAnalytics gaId={GOOGLE_ANALYTICS_ID} />}
      </body>
    </html>
  );
}
