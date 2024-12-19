import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ValidationError } from 'class-validator';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
      exceptionFactory: (errors: ValidationError[]) => {
        throw new BadRequestException({
          errors: [
            ...errors.map((e) => ({
              code:
                e.constraints &&
                e.contexts &&
                Object.keys(e.constraints).length >= 1
                  ? e.contexts[Object.keys(e.constraints)[0]].code
                  : undefined,
              field: e.property,
              message:
                e.constraints && Object.keys(e.constraints).length >= 1
                  ? e.constraints[Object.keys(e.constraints)[0]]
                  : undefined,
            })),
          ],
        });
      },
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
