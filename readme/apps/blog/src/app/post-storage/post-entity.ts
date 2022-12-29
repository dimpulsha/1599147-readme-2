import { Logger } from "@nestjs/common";
import { PostInterface, ContentInterface } from '@readme/shared';

export class PostEntity implements PostInterface {
  public id?: number;
  public userId: string;
  public contentType: string;
  public content: ContentInterface;
  public isRepost?: boolean;
  public originUserId?: string;
  public originPostId?: number;
  public likeCount?: number;
  public commentCount?: number;
  public repostCount?: number;
  public postState: string;
  public createDate?: Date;
  public publicationDate?: Date;
  public tagList?: string[];

  constructor(post: PostInterface) {
    this.fillEntity(post);
  }

  public fillEntity(post: PostInterface) {
    this.id = post.id;
    this.userId = post.userId;
    this.contentType = post.contentType;
    this.content = post.content;
    this.isRepost = post.isRepost;
    this.originUserId = post.originUserId;
    this.originPostId = post.originPostId;
    this.likeCount = post.likeCount;
    this.commentCount = post.commentCount;
    this.repostCount = post.repostCount;
    this.postState = post.postState;
    this.createDate = post.createDate;
    this.publicationDate = post.publicationDate;
    this.tagList = post.tagList;
  }

  public toObject() {
    Logger.log('PostEntity: execute .toObject method');
    return {...this}
  }

}
