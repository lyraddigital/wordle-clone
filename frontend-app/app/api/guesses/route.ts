import { wordExists } from "@/app/api/data/words";
import GuessColour from "@/app/api/enums/guess-colour";
import GuessLetterResult from "@/app/api/models/guess-letter-result";
import GuessRequest from "@/app/api/models/guess-request";
import GuessResult from "@/app/api/models/guess-result";
import gameState from "@/app/api/state/game-state";

export async function PATCH(request: Request) {
  const body = (await request.json()) as GuessRequest;

  if (body?.guess) {
    if (gameState.isGameOver) {
      return Response.json(
        { message: "Cannot perform a guess. The game is over" },
        { status: 400 }
      );
    }

    if (gameState.history.includes(body.guess)) {
      return Response.json({
        isSuccess: false,
        reason: "You have already tried that word",
      });
    }

    if (body.guess.length !== 5) {
      return Response.json({
        isSuccess: false,
        reason: "Word must be 5 characters long",
      });
    }

    const doesWordExist = await wordExists(body.guess);

    if (!doesWordExist) {
      return Response.json({
        isSuccess: false,
        reason: "Cannot submit guess. Word does not exist",
      });
    }

    gameState.history.push(body.guess);
    gameState.numberOfTurns += 1;
    gameState.isGameOver = gameState.numberOfTurns === 5;

    const currentSolution = gameState.currentWord;
    const numberOfTurns = gameState.numberOfTurns;
    const guessLetterResults: GuessLetterResult[] = [
      { letter: "a", colour: GuessColour.yellow },
    ];
    const result: GuessResult = {
      isGameOver: false,
      letterResults: guessLetterResults,
    };

    return Response.json(result);
  } else {
    return Response.json(
      { message: 'Please include a "guess" field in your payload' },
      { status: 400 }
    );
  }
}
