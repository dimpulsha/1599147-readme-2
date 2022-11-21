import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class LoggedUserRDO {

  @ApiProperty({
     description: 'The uniq user ID',
     example: '1ca630bedee5485068bgc80ca5a57edc'
   })
  @Expose({name: '_id'})
  public id: string;

  @ApiProperty({
     description: 'User login (email)',
     example: 'user@user.ru'
   })
  @Expose()
  public email: string;
}
