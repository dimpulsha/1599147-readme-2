import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostNotifyModel, PostNotifySchema } from './email-post.model';
import { PostNotifyRepository } from './email-post.repository';

@Module({
  imports: [MongooseModule.forFeature([
       { name: PostNotifyModel.name, schema: PostNotifySchema }
     ])],
  providers: [PostNotifyRepository],
  exports: [PostNotifyRepository]
})
export class PostNotifyModule {}
