import { Expose } from "class-transformer";

export class LoggedUser {

  @Expose({name: '_id'})
  public id: string;

  @Expose()
  public email: string;
}
