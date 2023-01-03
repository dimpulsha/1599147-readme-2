import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsString, Length } from "class-validator";
import { PostValidation, POST_REVIEW_LENGTH_VIOLATION, POST_TEXT_LENGTH_VIOLATION, POST_TITLE_LENGTH_VIOLATION } from "../../constants/post.constants";

export class TextDTO {

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
    description: 'Post review',
    example: 'Hi! The first post of my blog about...',
    maxLength: PostValidation.MaxPostReview,
    minLength: PostValidation.MinPostReview
  })
  @IsString()
  @Length(PostValidation.MinPostReview, PostValidation.MaxPostReview, { message: POST_REVIEW_LENGTH_VIOLATION})
  postReview: string;

  @Expose()
  @ApiProperty({
    description: 'Post text',
    example: 'Hi! The big text of post',
    maxLength: PostValidation.MaxPostText,
    minLength: PostValidation.MinPostText
  })
  @IsString()
  @Length(PostValidation.MinPostText, PostValidation.MaxPostText, { message: POST_TEXT_LENGTH_VIOLATION})
  postText: string;
}
