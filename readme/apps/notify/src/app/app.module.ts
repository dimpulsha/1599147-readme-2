import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import databaseConfig from '../config/database.config';
import { mailOptions } from '../config/mailer.config';
import { getMongoDbConfig } from '../config/mongo.config';
import { rabbitMqOptions } from '../config/rabbit.mq.config';
import { ENV_FILE_PATH } from './app.constant';
import { EmailDataModule } from './email-data/email-data.module';
import { validateEnvironments } from './env-notify-config.validation';

@Module({
  imports: [ConfigModule.forRoot({
    cache: true,
    isGlobal: true,
    envFilePath: ENV_FILE_PATH,
    load: [databaseConfig, rabbitMqOptions, mailOptions],
    validate: validateEnvironments,
  }),
    MongooseModule.forRootAsync(
      getMongoDbConfig()
    ), EmailDataModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
