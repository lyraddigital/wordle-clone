import { Global, Module } from '@nestjs/common';

import { StateService, UtilityService, WordService } from 'src/core/services';

@Global()
@Module({
  providers: [StateService, UtilityService, WordService],
  exports: [StateService, UtilityService, WordService],
})
export class CoreModule {}
