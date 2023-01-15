import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsString, Length } from "class-validator";
import { PostValidation, POST_AUTHOR_LENGTH_VIOLATION, POST_CITE_LENGTH_VIOLATION } from "../../constants/post.constants";

export class CiteDTO {
  @Expose()
  @ApiProperty({
    description: 'Cite text',
    example: 'In Nest, a microservice is fundamentally an application that uses a different transport layer than HTTP.',
    maxLength: PostValidation.MaxCiteText,
    minLength: PostValidation.MinCiteText
  })
  @IsString()
  @Length(PostValidation.MinCiteText, PostValidation.MaxCiteText, { message: POST_CITE_LENGTH_VIOLATION })
  postText: string;

  @Expose()
  @ApiProperty({
    description: 'Author of cite',
    example: 'Great Man',
    maxLength: PostValidation.MaxCiteAuthor,
    minLength: PostValidation.MinCiteAuthor
  })
  @IsString()
  @Length(PostValidation.MinCiteAuthor, PostValidation.MaxCiteAuthor, {message: POST_AUTHOR_LENGTH_VIOLATION})
  citeAuthor: string;
}
