import { ContentType } from "./content-type.enum";
import { PostState } from "./post-state.enum";

export interface PostInterface {
  id?: number;
  userId: number;
  contentType: ContentType;
  postName?: string;
  postReview?: string
  postText?: string;
  linkURL?: string;
  photoLink?: string;
  linkDescription?: string;
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
