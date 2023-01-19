import { BadRequestException, Inject, Injectable} from '@nestjs/common';
import { PostEntity } from '../post-storage/post-entity';
import { NotifyCommandEnum, PostInterface, PostStateEnum, TagInterface, UserStatCommandEnum } from '@readme/shared';
import { PostRepository } from '../post-storage/post.repository';
import { PostQuery } from './query/post-query';
import { POST_URL_BASE, RABBITMQ_BLOG_SERVICE, RABBITMQ_USER_SERVICE} from './constants/post.constants'
import { ClientProxy } from '@nestjs/microservices';
import { PostDTO } from './dto/post.dto';
import { SearchQuery } from './query/search-query';

@Injectable()
export class PostApiService {

  constructor(
    private readonly postRepository: PostRepository,
    @Inject(RABBITMQ_BLOG_SERVICE) private readonly rabbitClient: ClientProxy,
    @Inject(RABBITMQ_USER_SERVICE) private readonly rabbitUserClient: ClientProxy,
  ) { }

  private postEntity: PostEntity;

  private getTags(tags: string[]): TagInterface[] {

    const tagList = tags.map((item) => ({ name: item }))
    console.log(tagList);

    return tagList;
  }

  private async checkOwner(itemId: number, userId: string): Promise<boolean> {
    // можно попробовать универсальную функцию с переменным именем (или во все сервисы фиксированный интерфейс с набором имен, как было в Node-1)
    const currentItem = await this.getItem(itemId);
    if (!currentItem) { return false; }
    if (currentItem.userId === userId) { return true }

    return false;

  }

  public async create(userId: string, dto: PostDTO): Promise<PostInterface> {
    const postState = dto.postState ? dto.postState : PostStateEnum.Published;
    this.postEntity = new PostEntity({ ...dto, userId, postState, tagList: this.getTags(dto.tagList) });

    const result = await this.postRepository.create(this.postEntity);
    const postUrl = `${POST_URL_BASE}${result.id}`
    this.rabbitClient.emit(
      { cmd: NotifyCommandEnum.AddPost },
        {
        id: result.id,
        url: postUrl
      }
    );

    this.rabbitUserClient.emit(
      { cmd: UserStatCommandEnum.AddPostStat },
        {
        userId: result.userId,
      }
    );

    return result;
  }

  public async index(query: PostQuery): Promise<PostInterface[]> {
    const result = await this.postRepository.getItemList(query);
    return result;
  }

  public async getItem(id: number): Promise<PostInterface> {
    const result = await this.postRepository.getById(id);
    return result;
  }

  public async updateItem(userId: string, id: number, dto: PostDTO): Promise<PostInterface> {
    if (await this.checkOwner(id, userId)) {
      this.postEntity = new PostEntity({ ...dto, userId, tagList: this.getTags(dto.tagList) });

     return await this.postRepository.update(id, this.postEntity);
    }
     throw new BadRequestException();
  }

  public async deleteItem(userId: string, id: number): Promise<void>  {
    if (await this.checkOwner(id, userId)) {
      console.log('delete');
      await this.postRepository.delete(id);

      this.rabbitUserClient.emit(
      { cmd: UserStatCommandEnum.DeletePostStat },
        {
        userId: userId,
      })

    } else {
      throw new BadRequestException();
    }
  }

  public async repost( userId: string, id: number): Promise<PostInterface | number> {
    const result = await this.postRepository.repost(id, userId);

    return result;

  }

  public async switchLike(userId: string, id: number): Promise<boolean> {
    const result = await this.postRepository.like(id, userId);
    return result;
  }

  public async search(query: SearchQuery): Promise<PostInterface[]> {
    const result = await this.postRepository.search(query);
    return result;
  }

  public async getDraft(userId: string): Promise<PostInterface[]> {
    const query = new PostQuery;
    query.userId = userId;
    const postState = PostStateEnum.Draft;
    const result = await this.postRepository.getItemList(query, postState);
    return result;
  }

  public async publicationItem(userId: string, id: number): Promise<PostInterface> {
    if (await this.checkOwner(id, userId)) {
      const result = await this.postRepository.publicationItem(id);
      return result;
    } else {
       throw new BadRequestException();
    }
  }

}
