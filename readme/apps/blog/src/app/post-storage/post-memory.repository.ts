import {CRUDInterface} from '@readme/core'
import { PostInterface } from '@readme/shared';
import { PostEntity } from './post-entity';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class PostMemoryRepository implements CRUDInterface<PostEntity, number, PostInterface> {

  private repository: { [key: string]: PostInterface } = {}

  public async create(item: PostEntity): Promise<PostInterface> {
    Logger.log(`Post created ${item.id}`)
    const blogPostItem = { ...item.toObject() }
    this.repository[item.id] = blogPostItem;
    return { ...blogPostItem };
  }

  public async getById(id: number): Promise<PostInterface | null> {
    Logger.log(`Get Post by id = ${id}`);
    const result = this.repository[id];
    if (!result) {
      return null;
    }

    return result;
  }

  public async update(id: number, item: PostEntity): Promise<PostInterface> {
    Logger.log(`Post update id = ${item.id}`);
    this.repository[item.id] = { ...item.toObject() }
    return this.getById(id)
  }

  public async delete(id: number): Promise<void> {
    Logger.log(`Post delete id = ${id}`);
    delete this.repository[id];
  }

  public async getPostList(): Promise<PostInterface[]> {
    Logger.log('Post: getPostList');
    const result = (Object.values(this.repository));
    Logger.log(result);
    return result;
  }

}
