'use client';

import GameBoard from "./components/game-board";
import Header from "./components/header";
import ThemeProvider from "./components/theme-provider";

export default function Home() {
  return (
    <ThemeProvider>
      <main className="h-dvh flex flex-col justify-between items-center">
        <Header />
        <GameBoard />
      </main>
    </ThemeProvider>
  );
}