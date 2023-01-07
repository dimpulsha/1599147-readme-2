import { Logger } from '@nestjs/common';
import { PostNotifyInterface } from '@readme/shared';

export class PostNotifyEntity implements PostNotifyInterface {
  public url: string;
  public id: number;

  constructor(postNotify: PostNotifyInterface) {
    this.fillEntity(postNotify);
  }

  public toObject() {
    Logger.log('PostNotifyEntity: toObject');
    Logger.log({ ...this });
    return { ...this };
  }

  public fillEntity(postNotify: PostNotifyInterface) {
    this.url = postNotify.url;
    this.id = postNotify.id
  }

}
