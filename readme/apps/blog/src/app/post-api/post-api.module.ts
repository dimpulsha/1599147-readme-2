import { Module } from '@nestjs/common';
import { PostStorageModule } from '../post-storage/post-storage.module';
import { PostApiController } from './post-api.controller';
import { PostApiService } from './post-api.service';
import { ClientsModule } from '@nestjs/microservices';
import { RABBITMQ_BLOG_SERVICE } from './constants/post.constants';
import { getRabbitMqConfig } from '../config/rabbit.mq.config';
import { ConfigService } from '@nestjs/config';


@Module({
  controllers: [PostApiController],
  providers: [PostApiService],
  imports: [PostStorageModule, ClientsModule.registerAsync([
    {
      name: RABBITMQ_BLOG_SERVICE,
      useFactory: getRabbitMqConfig,
      inject: [ConfigService]
    }
  ])

  ]
})
export class PostApiModule {}


