import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ValidationError } from 'class-validator';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => {
        const fieldErrors = [];

        errors.forEach((error) => {
          if (!error.constraints) {
            return;
          }

          const constraintKeys = Object.keys(error.constraints);

          fieldErrors.push(
            ...constraintKeys.map((k) => ({
              code: error.contexts ? error.contexts[k].code : undefined,
              fieldName: error.property,
              message: error.constraints[k],
            })),
          );
        });

        fieldErrors.sort((a, b) => (a.code < b.code ? -1 : 1));

        throw new BadRequestException({
          errors: fieldErrors,
        });
      },
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
