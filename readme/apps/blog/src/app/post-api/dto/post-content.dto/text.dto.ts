import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsString, Length } from "class-validator";
import { PostValidation, POST_REVIEW_LENGTH_VIOLATION, POST_TEXT_LENGTH_VIOLATION, POST_TITLE_LENGTH_VIOLATION } from "../../constants/post.constants";

export class TextDTO {

  @Expose()
  @ApiProperty({
    description: 'Post title',
    example: 'Hi! The first post in my blog',
    maxLength: PostValidation.MaxPostTitle,
    minLength: PostValidation.MinPostTitle
  })
  @IsString()
  @Length(PostValidation.MinPostTitle, PostValidation.MaxPostTitle, { message: POST_TITLE_LENGTH_VIOLATION})
  postTitle: string;

  @Expose()
  @ApiProperty({
    description: 'Post review',
    example: 'Hi! The first post of my blog about... Coooooooooooool!',
    maxLength: PostValidation.MaxPostReview,
    minLength: PostValidation.MinPostReview
  })
  @IsString()
  @Length(PostValidation.MinPostReview, PostValidation.MaxPostReview, { message: POST_REVIEW_LENGTH_VIOLATION})
  postReview: string;

  @Expose()
  @ApiProperty({
    description: 'Post text',
    example: 'In addition to traditional (sometimes called monolithic) application architectures, Nest natively supports the microservice architectural style of development. Most of the concepts discussed elsewhere in this documentation, such as dependency injection, decorators, exception filters, pipes, guards and interceptors, apply equally to microservices.',
    maxLength: PostValidation.MaxPostText,
    minLength: PostValidation.MinPostText
  })
  @IsString()
  @Length(PostValidation.MinPostText, PostValidation.MaxPostText, { message: POST_TEXT_LENGTH_VIOLATION})
  postText: string;
}
