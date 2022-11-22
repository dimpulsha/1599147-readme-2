import { ApiProperty } from "@nestjs/swagger";
export class CreateCommentsDTO {

  @ApiProperty({
     description: 'Comments text',
     example: 'Lorem ipsum'
   })
  commentsText: string;

  @ApiProperty({
     description: 'Id of publication author',
     example: '1230484756235'
   })
  userId: string;
}
