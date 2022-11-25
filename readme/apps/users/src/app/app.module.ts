import { Module } from '@nestjs/common';
import { BlogUserModule } from './blog-user/blog-user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ENV_FILE_PATH } from './app.constant';
import databaseConfig from '../config/database.config';
import { validateDBEnvironments } from './env-db-config.validation';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoDbConfig } from '../config/mongo.config';

@Module({
  imports: [ConfigModule.forRoot({
    cache: true,
    isGlobal: true,
    envFilePath: ENV_FILE_PATH,
    load: [databaseConfig],
    validate: validateDBEnvironments,
  }),
    MongooseModule.forRootAsync(
      getMongoDbConfig()
    ),
    BlogUserModule,
    AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
