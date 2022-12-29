import { Module } from '@nestjs/common';
import { PostContentTypeService } from './content-type.service';
import { PostContentTypeController } from './content-type.controller';
import { PostContentTypeRepository } from './content-type.repository';

@Module({
  imports: [],
  controllers: [PostContentTypeController],
  providers: [PostContentTypeService, PostContentTypeRepository],
  exports: [PostContentTypeRepository]
})
export class PostContentTypeModule {}
