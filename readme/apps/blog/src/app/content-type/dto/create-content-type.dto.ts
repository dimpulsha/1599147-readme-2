import { ApiProperty } from "@nestjs/swagger";
import { ContentTypeEnum } from "@readme/shared";
import { Expose } from "class-transformer";
import { IsEnum } from "class-validator";
import { CONTENT_TYPE_VIOLATION } from "../constants/content-type.constants";

export class CreateContentTypeDTO {

  @Expose()
  @ApiProperty({
    description: 'Post content type',
    example: 'text'
  })
  @IsEnum(ContentTypeEnum, { message: CONTENT_TYPE_VIOLATION })
  public name: ContentTypeEnum;
}
