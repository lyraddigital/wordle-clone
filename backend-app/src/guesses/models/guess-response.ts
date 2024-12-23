import { GuessLetterResult } from 'src/core/models';

export type GuessResponse = {
  isGameOver: boolean;
  isCorrect: boolean;
  numberOfTurns: number;
  currentGuess: GuessLetterResult[];
  allGuesses: GuessLetterResult[][];
};
