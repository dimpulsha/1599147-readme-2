import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDTO {
  @ApiProperty({
     description: 'User login (email)',
     example: 'user@user.ru'
   })
  public email: string;

  @ApiProperty({
     description: 'User password',
     example: '123456'
   })
  public password: string;
}
