import { CRUDInterface } from '@readme/core';
import { UserInterface } from '@readme/shared';
import { BlogUserEntity } from './blog-user.entity';
import * as crypto from 'crypto';

export class BlogUserMemoryRepository implements CRUDInterface<BlogUserEntity, string, UserInterface> {

  private repository: {[key: string]: UserInterface} = {}

  public async create(item: BlogUserEntity): Promise<UserInterface> {

    const blogUserItem = { ...item.toObject(), _id: crypto.randomUUID() }
    this.repository[blogUserItem._id] = blogUserItem;
    return { ...blogUserItem };
  }


  public async getById(id: string): Promise<UserInterface> {
    if (this.repository[id]) {
      return { ...this.repository[id] }
    }
    return null;
  }

  public async update(id: string, item: BlogUserEntity): Promise<UserInterface> {
    this.repository[id] = { ...item.toObject(), _id: id };
    return this.getById(id);
  }

  public async delete(id: string): Promise<void> {
    delete this.repository[id];
  }

}
