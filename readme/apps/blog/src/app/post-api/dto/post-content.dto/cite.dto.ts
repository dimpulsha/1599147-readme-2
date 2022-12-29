import { ApiProperty } from "@nestjs/swagger";

export class CiteDTO {

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

}
