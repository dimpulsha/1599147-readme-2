import { Module } from '@nestjs/common';
import { CommentsApiService } from './comments-api.service';
import { CommentsApiController } from './comments-api.controller';

@Module({
  providers: [CommentsApiService],
  controllers: [CommentsApiController],
})
export class CommentsApiModule {}
