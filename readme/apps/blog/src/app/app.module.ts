import { Module } from '@nestjs/common';
import { PostApiModule } from './post-api/post-api.module';
import { PostStorageModule } from './post-storage/post-storage.module';


@Module({
  imports: [PostStorageModule,PostApiModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
