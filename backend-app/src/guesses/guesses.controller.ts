import { Body, Controller, Patch } from '@nestjs/common';

import { GuessRequest, GuessResponse } from 'src/guesses/models';
import { GuessesService } from 'src/guesses/services';

@Controller('guesses')
export class GuessesController {
  constructor(private readonly guessesService: GuessesService) {}

  @Patch()
  public async guessWord(
    @Body() request: GuessRequest,
  ): Promise<GuessResponse> {
    await this.guessesService.ensureGuessAllowed(request.guess);
    return this.guessesService.addNewGuess(request.guess);
  }
}
