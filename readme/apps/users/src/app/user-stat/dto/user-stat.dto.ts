import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsString } from "class-validator";


export class UserStatDTO {

  @ApiProperty({
    description: 'User unique address (email)',
    example: 'user@user.ru',
  })
  @IsString()
  @IsMongoId()
  public userId: string;
}
