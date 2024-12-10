import GuessLetterResult from "./guess-letter-result";

type GuessResult = {
  isGameOver: boolean;
  isCorrect: boolean;
  numberOfTurns: number;
  letterResults: GuessLetterResult[];
};

export default GuessResult;
