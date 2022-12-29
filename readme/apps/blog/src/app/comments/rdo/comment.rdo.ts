import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CommentRDO {

  @ApiProperty({
    description: 'The uniq comment ID',
    example: '1234567890'
  })
  @Expose()
  public id: number;

  @ApiProperty({
    description: 'Comments text',
    example: 'The great comment!'
  })
  @Expose()
  public text: string;

  @ApiProperty({
    description: 'The uniq user ID',
    example: '1ca630bedee5485068bgc80ca5a57edc'
  })
  @Expose()
  public userId: string;

  @ApiProperty({
    description: 'The post Id',
    example: '1234567890'
  })
  @Expose()
  public postId: number;
}
