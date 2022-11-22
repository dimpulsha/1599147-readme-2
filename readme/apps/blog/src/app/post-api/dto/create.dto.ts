import { ApiProperty } from "@nestjs/swagger";
export class CreateVideoDTO {

  @ApiProperty({
     description: 'Post title',
     example: 'Hi! The first post'
  })
  postName: string;

  @ApiProperty({
     description: 'Link ',
     example: 'https://site.test/video'
  })
  linkURL: string;

  @ApiProperty({
    description: 'List of publication tags',
    example: '#cats #joke #smile'
  })
  tagList?: string;
}

export class CreateTextDTO {

  @ApiProperty({
    description: 'Post title',
    example: 'Hi! The first post'
  })
  postName: string;

  @ApiProperty({
    description: 'Post review',
    example: 'Hi! The first post of my blog about...'
  })
  postReview: string;

  @ApiProperty({
    description: 'Post text',
    example: 'Hi! The big text of post'
  })
  postText: string;

  @ApiProperty({
    description: 'List of publication tags',
    example: '#daily'
  })
  tagList?: string;
}

export class CreatePhotoDTO {

  @ApiProperty({
     description: 'Link to photo',
     example: 'https://photo.test/photo-img.jpg'
  })
  photoLink: string;

  @ApiProperty({
    description: 'List of publication tags',
    example: '#dogs'
  })
  tagList?: string;
}

export class CreateLinkDTO {

  @ApiProperty({
     description: 'Link to internet',
     example: 'https://news.test/great-news.html'
  })
  linkURL: string;

  @ApiProperty({
     description: 'Link description',
     example: 'The great news from space'
  })
  linkDescription: string

  @ApiProperty({
    description: 'List of publication tags',
    example: '#science #news'
  })
  tagList?: string;
}

export class CreateCiteDTO {

  @ApiProperty({
    description: 'Cite text',
    example: 'blablabla'
  })
  postText: string;

  @ApiProperty({
    description: 'Author of cite',
    example: 'Great Man'
  })
  citeAuthor: string;

  @ApiProperty({
    description: 'List of publication tags',
    example: '#great'
  })
  tagList?: string;
}
