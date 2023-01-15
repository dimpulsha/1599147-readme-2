import { CRUDInterface } from '@readme/core';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable, Logger } from '@nestjs/common';
import { CommentEntity } from './comment.entity';
import { CommentInterface } from '@readme/shared';
import { CommentsQuery } from './query/comments-query';

@Injectable()
export class CommentRepository implements CRUDInterface<CommentEntity, number, CommentInterface> {
  constructor(private readonly prisma: PrismaService) { }

  public async create(item: CommentEntity): Promise<CommentInterface> {
    Logger.log('comment.repository : create new item');
    const commentItem = item.toObject();

    const result = await this.prisma.comment.create({
      data: {...commentItem }
    })

    await this.prisma.post.update({
      where: {
         id: commentItem.postId
      },
      data: {
        commentCount: {increment :1}
      }
    })

    return result;
  }

  public async getItemList({limit, page, sortDirection}: CommentsQuery, postId: number): Promise<CommentInterface[]> {

    const result = await this.prisma.comment.findMany({
       where: {
         postId: postId
       },
      take: limit,
      orderBy: [
         {
           id: sortDirection
         }
       ],
      skip: page > 0 ? limit * (page - 1) : undefined,
    }
    );

   return result;

  }

  public async getById(id: number): Promise<CommentInterface| null> {
    Logger.log(`comment.repository : get by id ${id}`);
     return await this.prisma.comment.findFirst({
       where: {
         id
       }
     });
  }

  public async update(id: number, item: CommentEntity): Promise<CommentInterface> {
    Logger.log(`comment.repository : update comment ${id}`);
    return await this.prisma.comment.update({
       where: {
         id
      },
      data: {...item.toObject()}
     });
  }

  public async delete(id: number): Promise<void> {
    Logger.log(`comment.repository : delete comment ${id}`);
    const comment = await this.getById(id)
    await this.prisma.comment.delete({
       where: {
        id,
       }
    });
    await this.prisma.post.update({
      where: {
         id: comment.postId
      },
      data: {
        commentCount: {increment :1}
      }
    })
  }
}
