import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import databaseConfig from '../config/database.config';
import { getMongoDbConfig } from '../config/mongo.config';
import { ENV_FILE_PATH } from './app.constant';
import { validateEnvironments } from './env-notify-config.validation';

@Module({
  imports: [ConfigModule.forRoot({
    cache: true,
    isGlobal: true,
    envFilePath: ENV_FILE_PATH,
    load: [databaseConfig],
    validate: validateEnvironments,
  }),
    MongooseModule.forRootAsync(
      getMongoDbConfig()
    ),],
  controllers: [],
  providers: [],
})
export class AppModule {}
