import { ContentTypeInterface } from "./content-type.interface";
import { PostStateInterface } from "./post-state.interface";
import { TagInterface } from "./tag.interface";


export interface PostInterface {
  id?: number;
  userId: string;
  contentType: ContentTypeInterface;
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
  isLike?: boolean;
  commentCount: number;
  repostCount: number;
  postState: PostStateInterface;
  createDate: Date;
  publicationDate: Date;
  tagList: TagInterface[];
}
