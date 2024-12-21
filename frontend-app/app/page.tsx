import GameBoard from "@/components/game-board/game-board";
import Header from "@/components/header/header";
import { apiEndpoint } from "@/lib/utils";

async function startGame(): Promise<void> {
  const response = await fetch(`${apiEndpoint}/games`, {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Could not start a new game");
  }
}

export default async function Home() {
  await startGame();

  return (
    <main className="h-dvh flex flex-col justify-between items-center">
      <Header />
      <GameBoard />
    </main>
  );
}