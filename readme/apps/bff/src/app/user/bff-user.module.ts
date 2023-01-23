import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { BffUserController } from './bff-user.controller';
import { BffUserService } from './bff-user.service';

@Module({
  controllers: [BffUserController],
  providers: [BffUserService],
  imports: [HttpModule]
})
export class BffUserModule {}
