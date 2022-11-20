import { Module } from '@nestjs/common';
import { PostApiModule } from './post-api/post-api.module';

@Module({
  imports: [PostApiModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
