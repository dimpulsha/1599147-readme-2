import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { PostCoreDTO } from "./post-content.dto/post-core.dto";
import { TextDTO } from "./post-content.dto/text.dto";

export default class CreateTextDTO extends PostCoreDTO {

  @Expose()
  @ApiProperty({
    description: 'Post content video',
    type: TextDTO
  })
  @ValidateNested()
  @Type(() => TextDTO)
  content: TextDTO;
}
