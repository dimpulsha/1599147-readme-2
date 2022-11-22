import { Logger } from "@nestjs/common";
import { PostInterface, PostKind } from '@readme/shared';
import { PostState } from "@readme/shared";

export class PostEntity implements PostInterface {
  public id: number;
  public userId: number;
  public postKind: PostKind;
  public postName: string;
  public postReview: string;
  public postText: string;
  public linkURL: string;
  public photoLink: string;
  public linkDescription: string;
  public citeAuthor: string;
  public isRepost: boolean;
  public originUserId: number;
  public originPostId: number;
  public likeCount: number;
  public commentCount: number;
  public repostCount: number;
  public postState: PostState;
  public createDate: Date;
  public publicationDate: Date;
  public tagList: string[];

  constructor(post: PostInterface) {
    this.fillEntity(post);
  }

  public fillEntity(post: PostInterface) {
    this.id = post.id;
    this.userId = post.userId;
    this.postKind = post.postKind;
    this.postName = post.postName;
    this.postReview = post.postReview;
    this.postText = post.postText;
    this.linkURL = post.linkURL;
    this.linkDescription = post.linkDescription;
    this.citeAuthor = post.citeAuthor;
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
