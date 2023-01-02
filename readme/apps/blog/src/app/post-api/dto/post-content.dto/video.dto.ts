import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsString, IsUrl, Length } from "class-validator";
import { PostValidation, POST_TITLE_LENGTH_VIOLATION } from "../../constants/post.constants";
export class VideoDTO {

  @Expose()
  @ApiProperty({
    description: 'Post title',
    example: 'Hi! The first post',
    maxLength: PostValidation.MaxPostText,
    minLength: PostValidation.MinPostText
  })
  @IsString()
  @Length(PostValidation.MinPostText, PostValidation.MaxPostText, { message: POST_TITLE_LENGTH_VIOLATION})
  postTitle: string;

  @Expose()
  @ApiProperty({
     description: 'Link ',
     example: 'https://site.test/video'
  })
  @IsUrl()
  linkURL: string;

}
