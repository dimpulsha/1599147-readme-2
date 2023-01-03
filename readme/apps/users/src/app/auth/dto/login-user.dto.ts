import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";
import { AUTH_USER_EMAIL_NOT_VALID, PASSWORD_LENGTH_VIOLATION, UserValidation } from "../constants/auth-constant";

export class LoginUserDTO {
  @ApiProperty({
    description: 'User unique address (email)',
    example: 'user@user.ru',
  })
  @IsEmail(
    {},
    {message: AUTH_USER_EMAIL_NOT_VALID},
  )
  public email: string;

  @ApiProperty({
    description: 'User password',
    example: '123456',
    maxLength: UserValidation.MaxUserPassword,
    minLength: UserValidation.MinUserPassword
  })
  @IsString()
  @Length(UserValidation.MinUserPassword, UserValidation.MaxUserPassword, { message: PASSWORD_LENGTH_VIOLATION })
  public password: string;
}
