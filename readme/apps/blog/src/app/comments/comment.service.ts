import { BadRequestException, Injectable} from '@nestjs/common';
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

  private async checkOwner(itemId: number, userId: string): Promise<boolean> {
    const currentItem = await this.getItem(itemId);
    if (!currentItem) { return false; }
    if (currentItem.userId === userId) return true;
    return false;
  }

  public async create(dto: CreateCommentDTO, postId: number, userId: string): Promise<CommentInterface> {
    const commentEntity = new CommentEntity({ ...dto, userId, postId });
    console.log(commentEntity);

    const result = await this.commentRepository.create(commentEntity);
    return result;
  }

    public async index(query: CommentsQuery, postId: number): Promise<CommentInterface[]>  {
    const result = await this.commentRepository.getItemList(query, postId);
    return result;
  }

  public async getItem(id: number): Promise<CommentInterface | null> {
    const result = await this.commentRepository.getById(id);
    return result;
  }

  public async updateItem(id: number, dto: UpdateCommentDTO, userId: string): Promise<CommentInterface> {
    const commentEntity = new CommentEntity({ ...dto });

    if (await this.checkOwner(id, userId)) {
      const result = await this.commentRepository.update(id, commentEntity);
      return result;
    } else {
      throw new BadRequestException();
    }
  }


  public async deleteItem(id: number, userId: string): Promise<void>  {
  if( await this.checkOwner(id, userId)) {

    await this.commentRepository.delete(id);
  } else {
    throw new BadRequestException();
    }
  }
}
