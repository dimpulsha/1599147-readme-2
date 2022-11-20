import { PostKind } from "./post-kind.enum";
import { PostState } from "./post-state.enum";

export interface PostInterface {
  id: number;
  userId: number;
  postKind: PostKind;
  postName?: string;
  postText?: string;
  linkURL?: string;
  photoLink?: string;
  citeAuthor?: string;
  isRepost: boolean;
  originUserId?: number;
  originPostId?: number;
  likeCount: number;
  commentCount: number;
  repostCount: number;
  postState: PostState;
  createDate: Date;
  publicationDate: Date;
  tagList: string[];
}
