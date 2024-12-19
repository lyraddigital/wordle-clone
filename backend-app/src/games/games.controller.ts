import { Controller, Post } from '@nestjs/common';

import { GamesService } from 'src/games/services';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  public async createNewGame(): Promise<void> {
    return await this.gamesService.createNewGame();
  }
}
