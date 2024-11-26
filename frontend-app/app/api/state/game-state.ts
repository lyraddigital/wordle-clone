export type GameState = {
  currentWord?: string;
  numberOfTurns: number;
  isGameOver: boolean;
  isSuccessfulGuess: boolean;
  reason?: string;
  history: string[];
};

const gameState: GameState = {
  numberOfTurns: 0,
  isGameOver: false,
  isSuccessfulGuess: true,
  history: [],
};

export default gameState;
