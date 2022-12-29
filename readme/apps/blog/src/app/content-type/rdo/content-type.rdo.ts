import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ContentTypeRDO {

  @ApiProperty({
    description: 'The uniq Id',
    example: '1234567890'
  })
  @Expose()
  public id: number;

  @ApiProperty({
    description: 'The uniq content-type ame',
    example: 'text'
  })
  @Expose()
  public name: string;
}
