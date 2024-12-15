export type GameState = {
  word?: string;
  history: string[];
  numberOfTurns: number;
  isGameOver: boolean;
};
