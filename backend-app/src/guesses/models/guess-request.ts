import { IsLowercase, IsNotEmpty, Length } from 'class-validator';

import { GuessErrorStatusCodes } from 'src/guesses/enums';

export class GuessRequest {
  @IsNotEmpty({
    context: { code: GuessErrorStatusCodes.GuessFieldEmpty },
    message: 'The guess field is required.',
  })
  @IsLowercase({
    context: { code: GuessErrorStatusCodes.GuessFieldLowerCase },
    message: 'The guess field must be lower case.',
  })
  @Length(5, 5, {
    context: { code: GuessErrorStatusCodes.GuessFieldLength },
    message: 'The guess field must be 5 characters long',
  })
  guess: string;
}
