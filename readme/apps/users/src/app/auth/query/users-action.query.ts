import { UserActionEnum } from '@readme/shared';
import { IsEnum, IsMongoId, IsOptional } from 'class-validator';

export class UserActionQuery {

  @IsEnum(UserActionEnum)
  public act: UserActionEnum;

  @IsOptional()
  @IsMongoId()
  public friendId?: string;

}
