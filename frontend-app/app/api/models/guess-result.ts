import GuessLetterResult from "./guess-letter-result";

type GuessResult = {
  isGameOver: boolean;
  isCorrect: boolean;
  numberOfTurns: number;
  guesses: GuessLetterResult[][];
};

export default GuessResult;
