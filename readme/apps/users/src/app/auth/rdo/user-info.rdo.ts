import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class UserInfoRDO {

  @ApiProperty({
     description: 'The uniq user ID',
     example: '1ca630bedee5485068bgc80ca5a57edc'
   })
  @Expose({ name: '_id'})
  public id: string;

  @ApiProperty({
     description: 'User login (email)',
     example: 'user@user.ru'
   })
  @Expose()
  public email: string;

  @ApiProperty({
     description: 'User first name',
     example: 'John'
   })
  @Expose()
  public firstName: string;

  @ApiProperty({
     description: 'User last name',
     example: 'Smith'
   })
  @Expose()
  public lastName: string;

  @ApiProperty({
     description: 'Avatar image file name',
     example: 'avatar.png'
   })
  @Expose()
  public avatarImg: string;

  @ApiProperty({
     description: 'Number of user publications',
     example: '42'
   })
  @Expose()
  public publicationCount: number;

  @ApiProperty({
     description: 'Number of user subscribers',
     example: '24'
   })
  @Expose()
  public friends: number;

  @ApiProperty({
     description: 'User registration date',
     example: '2022-03-27'
   })
  @Expose()
  public registrationDate: Date;
}
