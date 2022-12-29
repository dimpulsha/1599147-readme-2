import { Module } from '@nestjs/common';
import { CommentModule } from './comments/content-type.module';
import { PostContentTypeModule } from './content-type/content-type.module';
import { PostApiModule } from './post-api/post-api.module';
import { PostStorageModule } from './post-storage/post-storage.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, PostContentTypeModule, PostApiModule, PostStorageModule, CommentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
