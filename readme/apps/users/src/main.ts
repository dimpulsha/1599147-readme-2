import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app/app.module';
import { getRabbitMqStatConfig } from './config/rabbit.mq.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  app.connectMicroservice(getRabbitMqStatConfig(configService));
  await app.startAllMicroservices();

  const config = new DocumentBuilder()
     .setTitle('The «Users» service')
     .setDescription('Users service API')
     .setVersion('1.0')
     .build();

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('spec', app, document)
  app.useGlobalPipes(new ValidationPipe());

  const port = process.env.SERVICE_PORT;
  const host = process.env.SERVICE_HOST;

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://${host}:${port}/${globalPrefix}`
  );
}

bootstrap();
