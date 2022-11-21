import { Module } from '@nestjs/common';
import { CommentsApiService } from './comments-api.service';
import { CommentsApiController } from './comments-api.controller';
import { CommentsStorageModule } from '../comments-storage/comments-storage.module';

@Module({
  imports:[CommentsStorageModule],
  providers: [CommentsApiService],
  controllers: [CommentsApiController],
})
export class CommentsApiModule {}
