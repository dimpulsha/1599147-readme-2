import { Expose } from "class-transformer";

export class UserInfoRDO {
  @Expose({ name: '_id'})
  public id: string;

  @Expose()
  public email: string;

  @Expose()
  public firstName: string;

  @Expose()
  public lastName: string;

  @Expose()
  public avatarImg: string;

  @Expose()
  public publicationCount: number;

  @Expose()
  public friends: number;

  @Expose()
  public registrationDate: Date;
}
