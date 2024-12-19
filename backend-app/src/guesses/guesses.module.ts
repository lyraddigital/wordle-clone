import { Module } from '@nestjs/common';

import { GuessesService } from 'src/guesses/services';

import { GuessesController } from './guesses.controller';

@Module({
  providers: [GuessesService],
  controllers: [GuessesController],
})
export class GuessesModule {}
