import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDTO {
  @ApiProperty({
     description: 'User unique address (email)',
     example: 'user@user.ru'
   })
  public email: string;

  @ApiProperty({
     description: 'User first name',
     example: 'John'
   })
  public firstName: string;

  @ApiProperty({
     description: 'User last name',
     example: 'Smith'
   })
  public lastName: string;

  @ApiProperty({
     description: 'Avatar image file name',
     example: 'avatar.png'
   })
  public avatarImg?: string;

  @ApiProperty({
     description: 'User password',
     example: '123456'
   })
  public password: string;
}
