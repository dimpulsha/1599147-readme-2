import { CRUDInterface } from '@readme/core';
import { PostContentTypeEntity } from './content-type.entity';
import { ContentTypeInterface } from '@readme/shared';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class PostContentTypeRepository implements CRUDInterface<PostContentTypeEntity, number, ContentTypeInterface> {
  constructor(private readonly prisma: PrismaService) { }

  public async create(item: PostContentTypeEntity): Promise<ContentTypeInterface> {
    Logger.log('Create new content type');
     return this.prisma.contentType.create({
       data: { ...item.toObject() }
     });
   }

  public async delete(id: number): Promise<void> {
    Logger.log('Delete new content type');
     await this.prisma.contentType.delete({
       where: {
        id,
       }
     });
   }

  public async getById(id: number): Promise<ContentTypeInterface | null> {
    Logger.log('Get content type by Id');
     return await this.prisma.contentType.findFirst({
       where: {
         id
       }
     });
   }

  public async find(ids: number[] = []): Promise<ContentTypeInterface[]> {
    Logger.log('Get list of  content type');
     return await this.prisma.contentType.findMany({
       where: {
         id: {
           in: ids.length > 0 ? ids : undefined
         }
       }
     });
   }

  public async update(id: number, item: PostContentTypeEntity): Promise<ContentTypeInterface> {
    Logger.log('Update content type');
     return await this.prisma.contentType.update({
       where: {
         id
       },
       data: { ...item.toObject(), id}
     });
   }
}
