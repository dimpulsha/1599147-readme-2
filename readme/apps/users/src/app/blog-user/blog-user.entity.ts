import { Logger } from '@nestjs/common';
import { UserInterface } from '@readme/shared';
import { genSalt, compare, hash } from 'bcrypt';

export class BlogUserEntity implements UserInterface {
  public _id: string;
  public email: string;
  public firstName: string;
  public lastName: string;
  public avatarImg: string;
  public publicationCount: number;
  public friends: number;
  public registrationDate: Date;
  public passwordHash: string;

  private static SALT_ROUNDS = 10;

  public toObject() {
    Logger.debug('BlogUserEntity: toObject');
    Logger.debug({ ...this });
    console.log({...this});
    return { ...this };
  }

  public async setPassword(password: string): Promise<BlogUserEntity> {
    const pwdSalt = await genSalt(BlogUserEntity.SALT_ROUNDS);
    this.passwordHash = await hash(password, pwdSalt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return await compare(password, this.passwordHash);
  }

  public fillEntity(blogUser: UserInterface) {
    this._id = blogUser._id;
    this.avatarImg = blogUser.avatarImg;
    this.email = blogUser.email;
    this.firstName = blogUser.firstName;
    this.friends = blogUser.friends;
    this.lastName = blogUser.lastName;
    this.passwordHash = blogUser.passwordHash;
    this.publicationCount = blogUser.publicationCount;
    this.registrationDate = blogUser.registrationDate;
  }


}
