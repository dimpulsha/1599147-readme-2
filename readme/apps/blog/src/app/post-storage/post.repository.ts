import { CRUDInterface } from '@readme/core';
import { PostEntity } from './post-entity';
import { PostInterface, TagInterface } from '@readme/shared';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class PostRepository implements CRUDInterface<PostEntity, number, PostInterface> {
  constructor(private readonly prisma: PrismaService) { }

  private tagsListObjects(list: string[]): { where: {name: string}, create: {name: string} }[] {
    return list.map((item) => ({ where: {name: item}, create: {name: item}} ))
  }

  private tagsObjectToList(tagsObjects: TagInterface[]): string[] {
    return tagsObjects.map(({ name }) => name);
  }

  private postTransformation(post) {
      return {...post, contentType: post.contentType.name, postState: post.postState.name, tagList: this.tagsObjectToList(post.tags) }
  }

  public async create(item: PostEntity): Promise<PostInterface> {
    Logger.log('post.repository : create new entity');
    const entityData = item.toObject();

    const { userId, contentType, content, postState, tagList } = entityData;

    const result = await this.prisma.post.create({
      data: {
        userId,
        contentType: {
          connect: {
              name: contentType,
          },
        },
        content: { create: { ...content } },
        postState: {
          connectOrCreate: {
            where: {
              name: postState,
            },
            create: {
              name: postState,
            },
          }
        },
        tags: {
          connectOrCreate: this.tagsListObjects(tagList),
        }
      },
      include: {
        contentType: true,
        content: true,
        tags: true,
        postState: true,
      },
    }
  );

    return this.postTransformation(result);

  }

  public async getItemList(): Promise<PostInterface[] > {
    const result = await this.prisma.post.findMany({
       include: {
        contentType: true,
        content: true,
        tags: true,
        postState: true,
      },
    });

      return result.map((item) => (this.postTransformation(item)));

  }

  public async getById(id: number): Promise<PostInterface | null> {
    const result = await this.prisma.post.findFirst({
       where: {
         id
      },
      include: {
        contentType: true,
        content: true,
        tags: true,
        likeList: true,
        postState: true,
      },
    });

    console.log(result);

    if (result) {
      return this.postTransformation(result);
    }

    return null;

  }

  public async update(id: number, item: PostEntity): Promise<PostInterface> {
    Logger.log('post.repository : create new entity');
    const entityData = item.toObject();
    const currentData = await this.prisma.post.findUnique({
      where: {
        id
      },
      include: {
        contentType: true,
        content: true,
        tags: true,
        postState: true,
      },
    }
    );

    const { content, tagList } = entityData;
    const contentType = entityData.contentType ? entityData.contentType : currentData.contentType.name;
    const postState = entityData.postState ? entityData.postState : currentData.postState.name;
    const currentTagList = currentData.tags.map(({ name }) => ({ name }));
    await this.prisma.content.delete({ where: { postId: id } });

    const result = await this.prisma.post.update({
      where: {
        id
      },
      data: {
        contentType: {
          connect: {
            name: contentType,
          },
        },
        content: { create: {  ...content } },
        postState: {
          connectOrCreate: {
            where: {
              name: postState,
            },
            create: {
              name: postState,
            },
          }
        },
        tags: { disconnect: currentTagList,
          connectOrCreate: this.tagsListObjects(tagList),
        },
      },
      include: {
        contentType: true,
        content: true,
        tags: true,
        postState: true,
      },
    }
  );
    console.log(result);

    return this.postTransformation(result);
  }

  public async delete(id: number): Promise<void> {
    await this.prisma.post.delete({
       where: {
         id
       },
    })
  }

  public async repost(id: number, userId: string): Promise<PostInterface | number> {

    const isRepost = await this.prisma.post.findFirst({
      where: {
        originPostId: id,
        isRepost: true,
        userId: userId
      }
    });

    if (isRepost) {
      return isRepost.id
    }

    const originPost = await this.prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        contentType: true,
        content: true,
        tags: true,
        postState: true,
      },
    }
    );

    const { postName, postReview, postText, linkURL, photoLink, linkDescription, citeAuthor } = originPost.content;
    const currentTagList = originPost.tags.map(({ name }) => name );

    const result = await this.prisma.post.create({
      data: {
        userId,
        contentType: {
          connect: {
            name: originPost.contentType.name,
          },
        },
        content: { create: { postName, postReview, postText, linkURL, photoLink, linkDescription, citeAuthor } },
        postState: {
          connectOrCreate: {
            where: {
              name: originPost.postState.name,
            },
            create: {
              name: originPost.postState.name,
            },
          }
        },
        isRepost: true,
        originPost: { connect: { id: originPost.id } },
        originUserId: originPost.userId,
        tags: { connectOrCreate: this.tagsListObjects(currentTagList) },

      },
      include: {
        contentType: true,
        content: true,
        tags: true,
        postState: true,
      },
    }
    );

    await this.prisma.post.update({
      where: {
        id
      },
      data: {
        repostCount: {increment: 1},
      }

    })

     return this.postTransformation(result);
  }

  public async like(id: number, userId: string): Promise<boolean> {

    const like = await this.prisma.likes.findFirst({
      where: { postId: id, userId: userId }
    });
    console.log(like);

    if (like) {
     await this.prisma.post.update({
      where: {
        id
          },
       data: {
         likeList: {
           delete: { id: like.id }
         },
         likeCount: { decrement: 1 }
          }
     })
      return false;
    }

    await this.prisma.post.update({
      where: {
        id
          },
       data: {
         likeList: {
           create: {userId: userId}
         },
         likeCount: { increment: 1 }
        }
    })

    return true;

   }

}

