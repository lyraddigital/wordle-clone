import { Module } from '@nestjs/common';
import { AppController } from './guesses.controller';
import { AppService } from './services/guesses.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
