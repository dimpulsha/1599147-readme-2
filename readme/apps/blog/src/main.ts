console.log('Hello World!');

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  const config = new DocumentBuilder()
     .setTitle('The «Comments» service')
     .setDescription('Comments service API')
     .setVersion('1.0')
     .build();

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('spec', app, document)
  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }));

  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 4444;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
