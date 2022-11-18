import { CRUDInterface } from '@readme/core';
import { UserInterface } from '@readme/shared';
import { BlogUserEntity } from './blog-user.entity';
import * as crypto from 'crypto';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class BlogUserMemoryRepository implements CRUDInterface<BlogUserEntity, string, UserInterface> {

  private repository: {[key: string]: UserInterface} = {}

  public async create(item: BlogUserEntity): Promise<UserInterface> {

    const blogUserItem = { ...item.toObject(), _id: crypto.randomUUID() }
    this.repository[blogUserItem._id] = blogUserItem;
    Logger.log(`User created ${blogUserItem._id}`)
    return { ...blogUserItem };
  }

  public async getById(id: string): Promise<UserInterface> {
     Logger.log(`User getById`)
    if (this.repository[id]) {
      return { ...this.repository[id] }
    }
    return null;
  }

  public async getByEmail(email: string): Promise<UserInterface> {
     Logger.log(`User getEmail`)
    const existUser = Object.values(this.repository).find((item) => item.email === email);

    if (existUser) {
      return { ...existUser}
    }
    return null;
  }

  public async update(id: string, item: BlogUserEntity): Promise<UserInterface> {
    Logger.log(`User update ${id}`)
    this.repository[id] = { ...item.toObject(), _id: id };
    return this.getById(id);
  }

  public async delete(id: string): Promise<void> {
    Logger.log(`User delete ${id}`)
    delete this.repository[id];
  }

}
