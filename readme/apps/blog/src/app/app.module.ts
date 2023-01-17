import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ENV_FILE_PATH } from './app.constant';
import { rabbitMqOptions, rabbitMqStatOptions } from './config/rabbit.mq.config';
import { PostContentTypeModule } from './content-type/content-type.module';
import { validateEnvironments } from './env-blog-config.validation';
import { PostApiModule } from './post-api/post-api.module';
import { PostStorageModule } from './post-storage/post-storage.module';
import { PrismaModule } from './prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { getJwtConfig, jwtOptions } from './config/jwt.config';
import { uploadConfig } from './config/upload.config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { getServeStaticOptions } from './config/serve-static.config';
import { CommentModule } from './comments/comments.module';

@Module({
  imports: [PrismaModule,
    PostContentTypeModule,
    PostApiModule,
    PostStorageModule,
    CommentModule,
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [rabbitMqOptions, rabbitMqStatOptions, jwtOptions, uploadConfig ],
      validate: validateEnvironments,
  }),
    JwtModule.registerAsync({
      useFactory: getJwtConfig,
      inject: [ConfigService],
    }),
    PassportModule,
    ServeStaticModule.forRootAsync({
      useFactory: getServeStaticOptions,
      inject: [ConfigService],
    })],

  controllers: [],
  providers: [JwtStrategy],
})
export class AppModule {}
