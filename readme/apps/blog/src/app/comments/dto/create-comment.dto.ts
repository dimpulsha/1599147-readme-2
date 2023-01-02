import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
import { CommentsValidation, COMMENT_LENGTH_VIOLATION } from '../constants/comments.constants';

export class CreateCommentDTO {

  @ApiProperty({
    description: 'Comments text',
    example: 'The great comment!',
    maxLength: CommentsValidation.MaxContentLength,
    minLength: CommentsValidation.MinContentLength
  })

  @Expose()
  @IsString()
  @Length(CommentsValidation.MinContentLength, CommentsValidation.MaxContentLength, { message: COMMENT_LENGTH_VIOLATION})
  public text: string;

}
