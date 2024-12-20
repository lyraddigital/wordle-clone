import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CoreModule } from 'src/core';
import { GamesModule } from 'src/games';
import { GuessesModule } from 'src/guesses';

@Module({
  imports: [ConfigModule.forRoot(), CoreModule, GamesModule, GuessesModule],
})
export class AppModule {}
