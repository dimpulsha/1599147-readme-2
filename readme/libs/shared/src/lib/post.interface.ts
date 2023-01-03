import { ContentInterface } from "./content.interface";
import { TagInterface } from "./tag.interface";

export interface PostInterface {
  id?: number;
  userId: string;
  contentType?: string;
  content?: ContentInterface;
  isRepost?: boolean;
  originUserId?: string;
  originPostId?: number;
  likeCount?: number;
  isLike?: boolean;
  commentCount?: number;
  repostCount?: number;
  postState?: string;
  createDate?: Date;
  publicationDate?: Date;
  tagList?: TagInterface[];
}
