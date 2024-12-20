"use server";

import { apiEndpoint } from "@/lib/utils";

async function startGame(): Promise<void> {
  const response = await fetch(`${apiEndpoint}/games`, {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Could not start a new game");
  }
}

export default startGame;
