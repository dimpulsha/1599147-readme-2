import { PostKind } from "@readme/shared";

export class CreatePostDTO {
  postKind: PostKind;
  postName?: string;
  postText?: string;
  linkURL?: string;
  photoLink?: string;
  citeAuthor?: string;
  tags?: string;
}
