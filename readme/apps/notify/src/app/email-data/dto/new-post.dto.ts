import { ApiProperty } from '@nestjs/swagger';
import { PostNotifyInterface } from '@readme/shared';
import { IsNotEmpty } from 'class-validator';
import { POST_ID_EMPTY_VIOLATION, URL_EMPTY_VIOLATION } from '../constants/email-data.constants';

export class PostNotifyDTO implements PostNotifyInterface{

  @ApiProperty({
    description: 'Post Url',
    example: 'http://localhost:4444/api/blog/4',
  })
  @IsNotEmpty({message: URL_EMPTY_VIOLATION})
  public url: string;

  @ApiProperty({
    description: 'Post unique Id ',
    example: '',
  })
  @IsNotEmpty({message: POST_ID_EMPTY_VIOLATION})
  public id: number;
}
