import { Logger } from '@nestjs/common';
import {CommentInterface} from '@readme/shared'

export class CommentsEntity implements CommentInterface {

  public id: number;
  public commentText: string;
  public userId?: string;
  public postId?: number;

  constructor(comment: CommentInterface) {
    this.fillEntity(comment);
  }

  public fillEntity(comment: CommentInterface) {
    this.id = comment.id;
    this.commentText = comment.commentText;
    this.postId = comment.postId;
    this.userId = comment.userId;
  }

  public toObject() {
    Logger.log('BlogUserEntity: toObject');
    Logger.log({ ...this });
    return { ...this };
  }
}
