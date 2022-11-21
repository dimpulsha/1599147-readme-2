import { Module } from '@nestjs/common';
import { CommentsMemoryRepository } from './comments-memory.repository';

@Module({
  imports: [],
  providers: [CommentsMemoryRepository],
  exports:[CommentsMemoryRepository]
})
export class CommentsStorageModule {}
