import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';
import { PostValidation, POST_LINK_DESCRIPTION_VIOLATION } from "../../constants/post.constants";

export class LinkDTO {

  @Expose()
  @ApiProperty({
     description: 'Link to internet',
     example: 'https://news.test/great-news.html'
  })
  @IsUrl()
  linkURL: string;

  @Expose()
  @ApiProperty({
    description: 'Link description',
    example: 'The great news from space',
    maxLength: PostValidation.MaxLinkDescription,
  })
  @IsString()
  @IsOptional()
  @MaxLength(PostValidation.MaxLinkDescription, { message: POST_LINK_DESCRIPTION_VIOLATION})
  linkDescription: string
}
