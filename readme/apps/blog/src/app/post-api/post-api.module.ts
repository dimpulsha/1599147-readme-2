import { Module } from '@nestjs/common';
import { PostStorageModule } from '../post-storage/post-storage.module';
import { PostApiController } from './post-api.controller';
import { PostApiService } from './post-api.service';
import { ClientsModule } from '@nestjs/microservices';
import { RABBITMQ_BLOG_SERVICE, RABBITMQ_USER_SERVICE } from './constants/post.constants';
import { getRabbitMqConfig, getRabbitUserMqConfig } from '../config/rabbit.mq.config';
import { ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { getMulterOptions } from '../config/multer.config';


@Module({
  controllers: [PostApiController],
  providers: [PostApiService],
  imports: [PostStorageModule,
    ClientsModule.registerAsync([{
      name: RABBITMQ_BLOG_SERVICE,
      useFactory: getRabbitMqConfig,
      inject: [ConfigService]
    }
    ]),
    ClientsModule.registerAsync([{
      name: RABBITMQ_USER_SERVICE,
      useFactory: getRabbitUserMqConfig,
      inject: [ConfigService]
    }
    ]),
    MulterModule.registerAsync({
      useFactory: getMulterOptions,
      inject: [ConfigService],
    }),
  ]
})
export class PostApiModule {}


