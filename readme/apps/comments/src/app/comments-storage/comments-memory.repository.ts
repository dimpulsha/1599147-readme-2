import { Injectable, Logger } from "@nestjs/common";
import { CRUDInterface} from '@readme/core'
import { CommentInterface } from "@readme/shared";
import { CommentsEntity } from "./comments.entity";
import { generateRandomValue } from '@readme/shared';

@Injectable()
export class CommentsMemoryRepository implements CRUDInterface<CommentsEntity, number, CommentInterface> {

  private commentsRepository: { [key: number]: CommentInterface } = {}

  public async create(item: CommentsEntity): Promise<CommentInterface> {
    Logger.log(`Post created`)
    const commentsItem = { ...item.toObject(), id: generateRandomValue(3000, 5000000) }
    this.commentsRepository[commentsItem.id] = commentsItem;
    return { ...commentsItem };
  }

  public async getById(id: number): Promise<CommentInterface> {
      Logger.log(`Get Post by id = ${id}`);
    const result = this.commentsRepository[id];
    if (!result) {
      return null;
    }

    return result;

  }
  public async update(id: number, item: CommentsEntity): Promise<CommentInterface> {
       Logger.log(`Post update id = ${item.id}`);
    this.commentsRepository[item.id] = { ...item.toObject() }
    return this.getById(id)
  }
  public async delete(id: number): Promise<void> {
    Logger.log(`Post delete id = ${id}`);
    delete this.commentsRepository[id];
  }

  public async getCommentsList(postId: number): Promise<CommentInterface[]> {
    Logger.log('Post: getPostList');
    const result = (Object.values(this.commentsRepository).filter((item) => item.postId === postId));
    Logger.log(result);
    return result;
  }

}
