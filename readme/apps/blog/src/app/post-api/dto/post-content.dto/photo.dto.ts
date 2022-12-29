import { ApiProperty } from "@nestjs/swagger";

export class PhotoDTO {

  @ApiProperty({
     description: 'Link to photo',
     example: 'https://photo.test/photo-img.jpg'
  })
  photoLink: string;

}
