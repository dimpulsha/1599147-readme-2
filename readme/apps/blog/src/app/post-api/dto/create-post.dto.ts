import { ApiProperty } from "@nestjs/swagger";
import { ContentTypeEnum, PostStateEnum } from "@readme/shared";
import { ContentDTO } from "./post-content.dto/content.dto";
export class CreatePostDTO {

  @ApiProperty({
    description: 'Post content type',
    example: 'text'
  })
  contentType: ContentTypeEnum;

  @ApiProperty({
    description: 'Post content',
    example: 'Post content example'
  })
  content: ContentDTO;

  @ApiProperty({
    description: 'Post state',
    example: 'draft | published'
  })
  postState: PostStateEnum;

  @ApiProperty({
    description: 'List of publication tags',
    example: '#cats #joke #smile'
  })
  tagList?: string;
}
