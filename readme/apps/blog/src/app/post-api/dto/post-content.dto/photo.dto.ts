import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsUrl } from "class-validator";

export class PhotoDTO {

  @Expose()
  @ApiProperty({
     description: 'Link to photo',
     example: 'https://photo.test/photo-img.jpg'
  })
  @IsUrl()
  photoLink: string;

}
