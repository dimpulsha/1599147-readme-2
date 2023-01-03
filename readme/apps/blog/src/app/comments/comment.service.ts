import { Injectable} from '@nestjs/common';
import { CommentInterface } from '@readme/shared';
import { CommentEntity } from './comment.entity';
import { CommentRepository } from './comments.repository';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { UpdateCommentDTO } from './dto/update-comment.dto';
import { CommentsQuery } from './query/comments-query';

@Injectable()
export class CommentService {

  constructor(
    private readonly commentRepository: CommentRepository
  ) { }

  public async create(dto: CreateCommentDTO, postId: number): Promise<CommentInterface> {
    const userId = 'bla-1234567890-bla-8';
    const commentEntity = new CommentEntity({ ...dto, userId, postId });
    console.log(commentEntity);

    const result = await this.commentRepository.create(commentEntity);
    return result;
  }

    public async index(query: CommentsQuery) {
    const result = await this.commentRepository.getItemList(query);
    return result;
  }

  public async getItem(id: number): Promise<CreateCommentDTO | null> {
    const result = await this.commentRepository.getById(id);
    return result;
  }

  public async updateItem(id: number, dto: UpdateCommentDTO): Promise<CommentInterface> {
    const commentEntity = new CommentEntity({ ...dto });

    const result = await this.commentRepository.update(id, commentEntity);
    return result;
  }

  public async deleteItem(id: number): Promise<void>  {
   await this.commentRepository.delete(id);

  }
}
