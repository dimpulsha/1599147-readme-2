import {  ContentTypeInterface } from '@readme/shared';
import { Entity } from '@readme/shared';

export class PostContentTypeEntity implements Entity<PostContentTypeEntity>, ContentTypeInterface {

  public id: number;
  public name: string;

  constructor(contentType: ContentTypeInterface) {
    this.fillEntity(contentType)
  }

    public fillEntity(entity: ContentTypeInterface) {
     this.name = entity.name;
     this.id = entity.id;
   }

   public toObject(): PostContentTypeEntity {
     return { ...this }
   }
}
