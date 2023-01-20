import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BlogModule } from './blog/blog.module';
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
    UserModule,
    BlogModule,
    BffMainModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
