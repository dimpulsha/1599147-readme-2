import { ApiProperty } from "@nestjs/swagger";

export class UpdatePasswordDTO {

  @ApiProperty({
     description: 'User old password',
     example: '123456'
   })
  public oldPassword: string;

  @ApiProperty({
     description: 'User new password',
     example: '654321'
   })
  public newPassword: string;
}
