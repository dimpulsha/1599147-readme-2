import { ApiProperty } from "@nestjs/swagger";
export class VideoDTO {

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

}
