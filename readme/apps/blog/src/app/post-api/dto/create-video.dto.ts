import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { PostCoreDTO } from "./post-content.dto/post-core.dto";
import { VideoDTO } from "./post-content.dto/video.dto";

export default class CreateVideoDTO extends PostCoreDTO {

  @Expose()
  @ApiProperty({
    description: 'Post content video',
    type: VideoDTO
  })
  @ValidateNested()
  @Type(() => VideoDTO)
  content: VideoDTO;
}


