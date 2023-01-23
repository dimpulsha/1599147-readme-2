import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BffUserModule } from './user/bff-user.module';
import { BffBlogModule } from './blog/bff-blog.module';
import { ConfigModule } from '@nestjs/config';
import { ENV_FILE_PATH } from './constants/bff.constants';
import { bffConfig } from './config/bff.config';
import { validateEnvironments } from './bff-config.validation';
import { BffMainModule } from './main/bff-main.module';

@Module({
  imports: [ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [bffConfig ],
      validate: validateEnvironments,
  }),
    BffUserModule,
    BffBlogModule,
    BffMainModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
