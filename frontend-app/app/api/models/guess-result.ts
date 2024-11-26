import GuessLetterResult from "./guess-letter-result";

type GuessResult = {
  isSuccess: boolean;
  reason?: string;
  isGameOver?: boolean;
  numberOfTurns?: number;
  letterResults?: GuessLetterResult[];
};

export default GuessResult;
