import { Module } from '@nestjs/common';
import { PostApiModule } from './post-api/post-api.module';
import { PostStorageModule } from './post-storage/post-storage.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PostStorageModule, PostApiModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
