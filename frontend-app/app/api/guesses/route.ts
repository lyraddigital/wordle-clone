import { wordExists } from "@/app/api/data/words";
import GuessRequest from "@/app/api/models/guess-request";
import GuessResult from "@/app/api/models/guess-result";
import formatGuess from "@/app/api/services/guess.service";
import generateSuccess, {
  generateBadRequest,
  generateFalsePositive,
} from "@/app/api/services/response.service";
import gameState from "@/app/api/state/game-state";

export async function PATCH(request: Request) {
  const body = (await request.json()) as GuessRequest;

  if (body?.guess) {
    if (gameState.isGameOver) {
      return generateBadRequest("Cannot perform a guess. The game is over");
    }

    if (gameState.history.includes(body.guess)) {
      return generateBadRequest("You have already tried that word");
    }

    if (body.guess.length !== 5) {
      return generateBadRequest("Word must be 5 characters long");
    }

    const doesWordExist = await wordExists(body.guess);

    if (!doesWordExist) {
      return generateFalsePositive("Cannot submit guess. Word does not exist");
    }

    const currentSolution = gameState.currentWord!;
    const isCorrect =
      currentSolution.toLowerCase() === body.guess!.toLowerCase();

    gameState.history.push(body.guess);
    gameState.numberOfTurns += 1;
    gameState.isGameOver = gameState.numberOfTurns === 5 || isCorrect;

    const numberOfTurns = gameState.numberOfTurns;
    const isGameOver = gameState.isGameOver;
    const letterResults = formatGuess(currentSolution, body.guess!);
    const result: GuessResult = {
      letterResults,
      numberOfTurns,
      isGameOver,
      isCorrect,
    };

    return generateSuccess(result);
  } else {
    return generateBadRequest('Please include a "guess" field in your payload');
  }
}
