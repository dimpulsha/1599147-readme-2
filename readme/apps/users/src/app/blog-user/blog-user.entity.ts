import { Logger } from '@nestjs/common';
import { UserInterface } from '@readme/shared';
import { genSalt, compare, hash } from 'bcrypt';
import { SALT_ROUNDS } from './blog-user.constant';

export class BlogUserEntity implements UserInterface {
  public _id: string;
  public email: string;
  public userName: string;
  public avatarImg: string;
  public publicationCount: number;
  public friends: number;
  public registrationDate: Date;
  public passwordHash: string;

  constructor(blogUser: UserInterface) {
    this.fillEntity(blogUser);
  }

  public toObject() {
    Logger.log('BlogUserEntity: toObject');
    Logger.log({ ...this });
    return { ...this };
  }

  public async setPassword(password: string): Promise<BlogUserEntity> {
    const pwdSalt = await genSalt(SALT_ROUNDS);
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
    this.userName = blogUser.userName;
    this.friends = blogUser.friends;
    this.passwordHash = blogUser.passwordHash;
    this.publicationCount = blogUser.publicationCount;
    this.registrationDate = blogUser.registrationDate;
  }

}
