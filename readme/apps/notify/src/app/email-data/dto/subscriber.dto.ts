import { ApiProperty } from '@nestjs/swagger';
import { SubscriberInterface } from '@readme/shared';
import { IsEmail, IsMongoId, IsNotEmpty, IsString, Length } from 'class-validator';
import { AUTH_USER_EMAIL_NOT_VALID, EMAIL_EMPTY_VIOLATION, SubscriberValidation, USER_ID_EMPTY_VIOLATION, USER_ID_NO_MONGO_VIOLATION, USER_LENGTH_VIOLATION, USER_NAME_EMPTY_VIOLATION } from '../constants/email-data.constants';

export class SubscriberDTO implements SubscriberInterface{
  @ApiProperty({
    description: 'User unique Id (MongoDB ID)',
    example: '',
  })
  @IsNotEmpty({message: USER_ID_EMPTY_VIOLATION})
  @IsMongoId({message: USER_ID_NO_MONGO_VIOLATION})
  public id: string;

  @ApiProperty({
    description: 'User unique address (email)',
    example: 'user@user.ru',
  })
  @IsEmail(
    {},
    {message: AUTH_USER_EMAIL_NOT_VALID},
    )
  @IsNotEmpty({message: EMAIL_EMPTY_VIOLATION})
  public email: string;

  @ApiProperty({
    description: 'User name',
    example: 'John Smith',
    maxLength: SubscriberValidation.MaxUserName,
    minLength: SubscriberValidation.MinUserName
  })
  @IsString()
  @IsNotEmpty({message: USER_NAME_EMPTY_VIOLATION})
  @Length(SubscriberValidation.MinUserName, SubscriberValidation.MaxUserName, { message: USER_LENGTH_VIOLATION })
  public userName: string;
}
