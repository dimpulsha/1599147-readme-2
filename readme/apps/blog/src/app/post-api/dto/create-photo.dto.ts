import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { PhotoDTO } from "./post-content.dto/photo.dto";
import { PostCoreDTO } from "./post-content.dto/post-core.dto";

export default class CreatePhotoDTO extends PostCoreDTO {

  @Expose()
  @ApiProperty({
    description: 'Post content cite',
    type: PhotoDTO
  })
  @ValidateNested()
  @Type(() => PhotoDTO)
  content: PhotoDTO;
}


