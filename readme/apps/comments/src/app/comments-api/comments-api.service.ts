import { Injectable } from '@nestjs/common';
import { CommentsMemoryRepository } from '../comments-storage/comments-memory.repository';
import { CommentsEntity } from '../comments-storage/comments.entity';
import { CreateCommentsDTO } from './dto/create-comments.dto';



@Injectable()
export class CommentsApiService {

  constructor(
    private readonly commentRepository: CommentsMemoryRepository
  ) {}

  async create(dto: CreateCommentsDTO, postId: number) {
    const newComment = {
      commentText: dto.commentsText,
      userId: dto.userId,
      postId: postId,
    }

    const commentEntity = new CommentsEntity(newComment);

    return await this.commentRepository.create(commentEntity);

  }

  async getList(postId: number) {
    return await this.commentRepository.getCommentsList(postId);
  }

}
