import GameBoard from "@/components/game-board/game-board";
import Header from "@/components/header/header";

export default function Home() {
  return (
    <main className="h-dvh flex flex-col justify-between items-center">
      <Header />
      <GameBoard />
    </main>
  );
}