import { ApiProperty } from "@nestjs/swagger";

export class LinkDTO {

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

}
