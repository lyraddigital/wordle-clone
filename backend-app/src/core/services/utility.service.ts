import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class UtilityService {
  public throwBadRequestException(code: number, message: string) {
    throw new BadRequestException({
      errors: [
        {
          code,
          message,
        },
      ],
    });
  }

  public throwNotFoundException(code: number, message: string) {
    throw new NotFoundException({
      errors: [
        {
          code,
          message,
        },
      ],
    });
  }
}
