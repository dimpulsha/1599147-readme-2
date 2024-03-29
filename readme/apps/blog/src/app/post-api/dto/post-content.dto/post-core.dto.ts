import { ApiProperty } from "@nestjs/swagger";
import { ContentTypeEnum, PostStateEnum } from "@readme/shared";
import { Expose } from "class-transformer";
import { ArrayMaxSize, IsArray, IsEnum, IsOptional, Length } from "class-validator";
import { CONTENT_TYPE_VIOLATION, PostValidation, POST_STATE_VIOLATION, POST_TAG_LENGTH_VIOLATION, TAG_COUNT_VIOLATION } from "../../constants/post.constants";


export class PostCoreDTO {

  @Expose()
  @ApiProperty({
    description: 'Post content type',
    example: 'text'
  })
  @IsEnum(ContentTypeEnum, { message: CONTENT_TYPE_VIOLATION })
  public contentType: ContentTypeEnum;

  @Expose()
  @ApiProperty({
    description: 'Post content',
    example: 'Post content example'
  })

  @IsEnum(PostStateEnum, { message: POST_STATE_VIOLATION })
  @IsOptional()
  public postState?: PostStateEnum;

  @Expose()
  @ApiProperty({
    description: 'List of publication tags',
    example: '[cats] [joke] [smile]'
  })
  @IsArray()
  @IsOptional()
  @ArrayMaxSize(PostValidation.MaxTagsCount, { message: TAG_COUNT_VIOLATION})
  @Length(PostValidation.MinTagLength, PostValidation.MaxTagLength, {each: true, message: POST_TAG_LENGTH_VIOLATION})
  public tagList?: string[];
}
