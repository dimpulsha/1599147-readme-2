import { CommentInterface } from '@readme/shared';
import { Entity } from '@readme/shared';

export class CommentEntity implements Entity<CommentEntity>, CommentInterface {

  fillEntity(entity: CommentInterface) {
    this.id = entity.id;
    this.text = entity.text;
    this.userId = entity.userId;
    this.postId = entity.postId;
  }

  public id?: number;
  public text: string;
  public userId: string;
  public postId: number;

  constructor(comment: CommentInterface) {
    this.fillEntity(comment)
  }

  toObject(): CommentEntity {
    return {...this}
  }

}
