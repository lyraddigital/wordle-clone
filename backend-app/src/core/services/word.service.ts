import { Injectable } from '@nestjs/common';

import { words } from 'src/core/db';
import { GameState } from 'src/core/models';
import { StateService } from 'src/core/services';

@Injectable()
export class WordService {
  constructor(private readonly stateService: StateService) {}

  public async doesWordExist(word: string): Promise<boolean> {
    return await Promise.resolve(words.some((w) => w === word));
  }

  public async chooseRandomWord(): Promise<void> {
    const randomIndex = Math.floor(Math.random() * words.length);
    const newWord = words[randomIndex]!;
    const patchedGameState: Partial<GameState> = {
      word: newWord,
    };

    this.stateService.patchState(patchedGameState);

    return await Promise.resolve();
  }
}
