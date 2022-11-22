import { Module } from '@nestjs/common';
import { CommentsApiModule } from './comments-api/comments-api.module';
import { CommentsStorageModule } from './comments-storage/comments-storage.module';

@Module({
  imports: [CommentsApiModule, CommentsStorageModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
