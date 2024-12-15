import { Injectable } from '@nestjs/common';
import { GameState } from 'src/core/models/game-state';

import { StateService } from 'src/core/services/state.service';
import GuessLetterResult from 'src/models/guess-letter-result';

@Injectable()
export class GuessesService {
  constructor(private stateService: StateService) {}

  public getFormattedGuess(currentGuess: string): GuessLetterResult[] {
    return [];
  }

  public addNewGuess(currentGuess: string): void {
    const currentState = this.stateService.getCurrentState();
    const currentHistory = [...currentState.history];
    const currentWord = currentState.word;
    let currentNumberOfTurns = currentState.numberOfTurns;

    currentHistory.push(currentGuess);
    currentNumberOfTurns += 1;

    const isCorrectGuess =
      currentWord.toLowerCase() === currentGuess.toLowerCase();
    const isGameOver = currentNumberOfTurns === 5 || isCorrectGuess;

    const patchedGameState: Partial<GameState> = {
      history: currentHistory,
      numberOfTurns: currentNumberOfTurns,
      isGameOver,
    };

    this.stateService.patchState(patchedGameState);
  }
}
