import { Module } from '@nestjs/common';
import { CommentController } from './comments.controller';
import { CommentService } from './comment.service';
import { CommentRepository } from './comments.repository';

@Module({
  imports: [],
  controllers: [CommentController],
  providers: [CommentService, CommentRepository],
  exports: [CommentRepository]
})
export class CommentModule {}
