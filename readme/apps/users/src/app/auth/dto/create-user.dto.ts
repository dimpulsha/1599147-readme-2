import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from 'class-validator';
import { AUTH_USER_EMAIL_NOT_VALID, PASSWORD_LENGTH_VIOLATION, UserValidation, USER_LENGTH_VIOLATION } from "../constants/auth-constant";


export class CreateUserDTO {
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
    description: 'User name',
    example: 'John Smith',
    maxLength: UserValidation.MaxUserName,
    minLength: UserValidation.MinUserName
  })
  @IsString()
  @Length(UserValidation.MinUserName, UserValidation.MaxUserName, { message: USER_LENGTH_VIOLATION })
  public userName: string;

  @ApiProperty({
     description: 'Avatar image file name',
     example: 'avatar.png'
  })
  public avatarImg?: string;

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
