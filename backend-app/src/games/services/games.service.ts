import { Injectable } from '@nestjs/common';

import { WordService } from 'src/core/services';

@Injectable()
export class GamesService {
  constructor(private readonly wordService: WordService) {}

  public async createNewGame(): Promise<void> {
    await this.wordService.chooseRandomWord();
  }
}
