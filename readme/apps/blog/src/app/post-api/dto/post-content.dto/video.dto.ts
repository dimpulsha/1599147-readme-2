import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsString, IsUrl, Length } from "class-validator";
import { PostValidation, POST_TITLE_LENGTH_VIOLATION } from "../../constants/post.constants";
export class VideoDTO {

  @Expose()
  @ApiProperty({
    description: 'Post title',
    example: 'Hi! The first post',
    required: true,
    minLength: PostValidation.MinPostTitle,
    maxLength: PostValidation.MaxPostTitle
  })
  @IsString()
  @Length( PostValidation.MinPostTitle, PostValidation.MaxPostTitle, { message: POST_TITLE_LENGTH_VIOLATION})
  postTitle: string;

  @Expose()
  @ApiProperty({
    description: 'Link',
    example: 'https://site.test/video',
    required: true,
  })
  @IsUrl()
  linkURL: string;
}
