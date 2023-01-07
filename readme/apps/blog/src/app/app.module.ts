import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ENV_FILE_PATH } from './app.constant';
import { CommentModule } from './comments/content-type.module';
import { rabbitMqOptions } from './config/rabbit.mq.config';
import { PostContentTypeModule } from './content-type/content-type.module';
import { validateEnvironments } from './env-users-config.validation';
import { PostApiModule } from './post-api/post-api.module';
import { PostStorageModule } from './post-storage/post-storage.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, PostContentTypeModule, PostApiModule, PostStorageModule, CommentModule, ConfigModule.forRoot({
    cache: true,
    isGlobal: true,
    envFilePath: ENV_FILE_PATH,
    load: [rabbitMqOptions ],
    validate: validateEnvironments,
  }),],
  controllers: [],
  providers: [],
})
export class AppModule {}
