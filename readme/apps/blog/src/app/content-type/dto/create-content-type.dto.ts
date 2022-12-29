import { ApiProperty } from "@nestjs/swagger";
import { ContentTypeEnum } from "@readme/shared";
export class CreateContentTypeDTO {

  @ApiProperty({
    description: 'Post content type',
    example: 'text'
  })
  public name: ContentTypeEnum;
}
