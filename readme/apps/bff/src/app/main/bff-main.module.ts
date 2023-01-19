import { Module } from '@nestjs/common';
import { BffMainController } from './bff-main.controller';
import { BffMainService } from './bff-main.service';

@Module({
  controllers: [BffMainController],
  providers: [BffMainService],
  imports: []
})
export class BffMainModule {}
