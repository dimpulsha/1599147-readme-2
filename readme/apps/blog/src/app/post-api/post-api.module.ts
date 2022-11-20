import { Module } from '@nestjs/common';
import { PostStorageModule } from '../post-storage/post-storage.module';
import { PostApiController } from './post-api.controller';
import { PostApiService } from './post-api.service';


@Module({
  controllers: [PostApiController],
  providers: [PostApiService],
  imports: [PostStorageModule]
})
export class PostApiModule {}
