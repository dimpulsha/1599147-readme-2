import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class FileInfoRDO {

  @ApiProperty({
    description: 'The uniq uploaded file URL',
    example: '1234567890abcdef.'
  })
  @Expose()
  public fileUrl: string;
}
