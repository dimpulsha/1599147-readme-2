import { Module } from '@nestjs/common';
import { PostMemoryRepository } from './post-memory.repository';

@Module({
  imports: [],
  providers: [PostMemoryRepository],
  exports: [PostMemoryRepository]
})

export class PostStorageModule {}
