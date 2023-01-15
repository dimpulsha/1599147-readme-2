import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { LinkDTO } from "./post-content.dto/link.dto";
import { PostCoreDTO } from "./post-content.dto/post-core.dto";

export default class CreateLinkDTO extends PostCoreDTO {

  @Expose()
  @ApiProperty({
    description: 'Post content cite',
    type: LinkDTO
  })
  @ValidateNested()
  @Type(() => LinkDTO)
  content: LinkDTO;
}


