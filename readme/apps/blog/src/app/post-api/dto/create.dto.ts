export class CreateVideoDTO {
  postName: string;
  linkURL: string;
  tagList?: string;
}

export class CreateTextDTO {
  postName: string;
  postReview: string;
  postText: string;
  tagList?: string;
}

export class CreatePhotoDTO {
  photoLink: string;
  tagList?: string;
}

export class CreateLinkDTO {
  linkURL: string;
  linkDescription: string
  tagList?: string;
}

export class CreateCiteDTO {
  postText: string;
  citeAuthor: string;
  tagList?: string;
}
