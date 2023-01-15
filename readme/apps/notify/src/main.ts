import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app/app.module';
import { getRabbitMqConfig } from './config/rabbit.mq.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService>(ConfigService);

  app.connectMicroservice(getRabbitMqConfig(configService));

  await app.startAllMicroservices();
  Logger.log(`🚀 Notify service is running on`);

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

  const port = process.env.PORT || 5555;
  await app.listen(port);
  Logger.log(
    `🚀 REST is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
