import { Module } from '@nestjs/common';
import { CommentsApiController } from './comments-api.controller';

@Module({
  controllers: [CommentsApiController],
})
export class CommentsApiModule {}
