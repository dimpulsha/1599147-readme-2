import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { CiteDTO } from "./post-content.dto/cite.dto";
import { PostCoreDTO } from "./post-content.dto/post-core.dto";

export default class CreateCiteDTO extends PostCoreDTO {

  @Expose()
  @ApiProperty({
    description: 'Post content cite',
    type: CiteDTO
  })
  @ValidateNested()
  @Type(() => CiteDTO)
  content: CiteDTO;
}


