import { Module } from '@nestjs/common';

import { CoreModule } from 'src/core';
import { GamesModule } from 'src/games';
import { GuessesModule } from 'src/guesses';

@Module({
  imports: [CoreModule, GamesModule, GuessesModule],
})
export class AppModule {}
