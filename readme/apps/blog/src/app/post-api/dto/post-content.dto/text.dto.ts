import { ApiProperty } from "@nestjs/swagger";

export class TextDTO {

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
}
