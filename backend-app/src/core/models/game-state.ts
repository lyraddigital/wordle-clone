import { GuessLetterResult } from './guess-letter-result';

export type GameState = {
  word?: string;
  numberOfTurns: number;
  history: string[];
  isCorrect: boolean;
  isGameOver: boolean;
  guesses: Array<Array<GuessLetterResult>>;
};
