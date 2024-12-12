import GuessLetterResult from "@/app/api/models/guess-letter-result";

export type GameState = {
  currentWord?: string;
  numberOfTurns: number;
  isGameOver: boolean;
  isSuccessfulGuess: boolean;
  reason?: string;
  history: string[];
  guesses: GuessLetterResult[][];
};

const gameState: GameState = {
  numberOfTurns: 0,
  isGameOver: false,
  isSuccessfulGuess: true,
  history: [],
  guesses: [],
};

export default gameState;
