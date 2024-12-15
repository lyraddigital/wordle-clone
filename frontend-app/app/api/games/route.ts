import getRandomWord from "@/app/api/data/words";
import RandomWordResult from "@/app/api/models/random-word-result";
import gameState from "../state/game-state";

export async function POST() {
  const randomWordResult: RandomWordResult = {
    word: getRandomWord(),
  };

  gameState.currentWord = randomWordResult.word;
  gameState.guesses = [];
  gameState.history = [];
  gameState.isGameOver = false;
  gameState.isSuccessfulGuess = false;
  gameState.numberOfTurns = 0;
  delete gameState.reason;

  return Response.json(randomWordResult);
}
