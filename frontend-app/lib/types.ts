import { GuessColour } from "./enums";

export type GuessLetterResult = {
  letter: string;
  colour: GuessColour;
};

export type ApiError = {
  code: number;
  fieldName?: string;
  message: string;
};

export type ApiSubmitGuessResponse = {
  isGameOver?: boolean;
  isCorrect?: boolean;
  numberOfTurns?: number;
  currentGuess?: GuessLetterResult[];
  allGuesses?: GuessLetterResult[][];
  errors?: ApiError[];
};
