import { ApiProperty } from "@nestjs/swagger";
import { ContentTypeEnum } from "@readme/shared";
export class UpdateContentTypeDTO {

  @ApiProperty({
    description: 'Post content type',
    example: 'text'
  })
  public name: ContentTypeEnum;
}
