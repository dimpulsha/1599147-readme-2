import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ENV_FILE_PATH } from './app.constant';
import { CommentModule } from './comments/content-type.module';
import { rabbitMqOptions } from './config/rabbit.mq.config';
import { PostContentTypeModule } from './content-type/content-type.module';
import { validateEnvironments } from './env-users-config.validation';
import { PostApiModule } from './post-api/post-api.module';
import { PostStorageModule } from './post-storage/post-storage.module';
import { PrismaModule } from './prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './post-api/strategies/jwt.strategy';
import { getJwtConfig, jwtOptions } from './config/jwt.config';

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
      load: [rabbitMqOptions, jwtOptions ],
      validate: validateEnvironments,
  }),
    JwtModule.registerAsync({
      useFactory: getJwtConfig,
      inject: [ConfigService],
    }),
    PassportModule],
  controllers: [],
  providers: [JwtStrategy],
})
export class AppModule {}
