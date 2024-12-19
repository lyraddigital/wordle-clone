import { Module } from '@nestjs/common';

import { GamesService } from 'src/games/services';

import { GamesController } from './games.controller';

@Module({
  providers: [GamesService],
  controllers: [GamesController],
})
export class GamesModule {}
