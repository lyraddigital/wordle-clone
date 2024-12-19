import { Injectable } from '@nestjs/common';

import { GameState } from 'src/core/models';
import { StateService, UtilityService, WordService } from 'src/core/services';
import { GuessColour } from 'src/core/enums';
import { GuessLetterResult } from 'src/core/models';
import { GuessErrorStatusCodes } from 'src/guesses/enums';
import { GuessResponse } from 'src/guesses/models';

@Injectable()
export class GuessesService {
  constructor(
    private readonly stateService: StateService,
    private readonly utilityService: UtilityService,
    private readonly wordService: WordService,
  ) {}

  public async ensureGuessAllowed(currentGuess: string): Promise<void> {
    const gameState = this.stateService.getCurrentState();

    if (!gameState.word) {
      this.utilityService.throwBadRequestException(
        GuessErrorStatusCodes.NewWordRequired,
        'Cannot perform a guess. You need to get a new word first',
      );
    }

    if (gameState.isGameOver) {
      this.utilityService.throwBadRequestException(
        GuessErrorStatusCodes.GameIsOver,
        'Cannot perform a guess. The game is over',
      );
    }

    if (gameState.history.includes(currentGuess)) {
      this.utilityService.throwBadRequestException(
        GuessErrorStatusCodes.WordAlreadyTried,
        'You have already tried that word',
      );
    }

    const doesWordExist = await this.wordService.doesWordExist(currentGuess);

    if (!doesWordExist) {
      this.utilityService.throwNotFoundException(
        GuessErrorStatusCodes.WordDoesNotExist,
        'Cannot submit guess. Word does not exist',
      );
    }
  }

  public addNewGuess(currentGuess: string): GuessResponse {
    const currentState = this.stateService.getCurrentState();
    const currentHistory = [...currentState.history];
    const currentWord = currentState.word;
    const currentGuesses = currentState.guesses;
    let currentNumberOfTurns = currentState.numberOfTurns;
    const currentGuessFormatted = this.getFormattedGuess(
      currentGuess,
      currentState,
    );

    currentHistory.push(currentGuess);
    currentGuesses.push(currentGuessFormatted);
    currentNumberOfTurns += 1;

    const isCorrectGuess =
      currentWord.toLowerCase() === currentGuess.toLowerCase();
    const isGameOver = currentNumberOfTurns === 5 || isCorrectGuess;
    const patchedGameState: Partial<GameState> = {
      guesses: currentGuesses,
      history: currentHistory,
      isCorrect: isCorrectGuess,
      isGameOver,
      numberOfTurns: currentNumberOfTurns,
    };

    this.stateService.patchState(patchedGameState);

    return {
      isCorrect: isCorrectGuess,
      isGameOver,
      numberOfTurns: currentNumberOfTurns,
      guesses: currentGuesses,
    };
  }

  private getFormattedGuess(
    currentGuess: string,
    state: GameState,
  ): GuessLetterResult[] {
    const solution = state.word!;
    const solutionArray: (string | null)[] = [...solution.split('')];
    const formattedGuess = [...currentGuess.split('')].map<GuessLetterResult>(
      (l) => {
        return { letter: l, colour: GuessColour.grey };
      },
    );

    // find any green letters
    formattedGuess.forEach((l, i) => {
      if (formattedGuess[i] && solutionArray[i] === l.letter) {
        formattedGuess[i].colour = GuessColour.green;
        solutionArray[i] = null;
      }
    });

    // find any yellow letters
    formattedGuess.forEach((l, i) => {
      if (
        formattedGuess[i] &&
        solutionArray.includes(l.letter) &&
        l.colour !== GuessColour.green
      ) {
        formattedGuess[i].colour = GuessColour.yellow;
        solutionArray[solutionArray.indexOf(l.letter)] = null;
      }
    });

    return formattedGuess;
  }
}
