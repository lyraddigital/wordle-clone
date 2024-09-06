import clsx from "clsx";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wordle",
  description: "",
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
      <body className={layoutClasses}>{children}</body>
    </html>
  );
}
