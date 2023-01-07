import { Inject, Injectable} from '@nestjs/common';
import { CreatePostDTO } from './dto/create-post.dto';
import { PostEntity } from '../post-storage/post-entity';
import { NotifyCommandEnum, PostInterface, PostStateEnum, TagInterface } from '@readme/shared';
import { PostRepository } from '../post-storage/post.repository';
import { UpdatePostDTO } from './dto/update-post.dto';
import { PostQuery } from './query/post-query';
import { POST_URL_BASE, RABBITMQ_BLOG_SERVICE} from './constants/post.constants'
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class PostApiService {

  constructor(
    private readonly postRepository: PostRepository,
    @Inject(RABBITMQ_BLOG_SERVICE) private readonly rabbitClient: ClientProxy
  ) { }

  private postEntity: PostEntity;

  private getTags(tags: string[]): TagInterface[] {

    const tagList = tags.map((item) => ({ name: item }))
    console.log(tagList);

    return tagList;
  }

  public async create(dto: CreatePostDTO): Promise<PostInterface> {
    const userId = 'bla-1234567890-bla-6';
    const postState = dto.postState ? dto.postState : PostStateEnum.Draft;
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

    return result;
  }

  public async index(query: PostQuery) {
    const result = await this.postRepository.getItemList(query);
    return result;
  }

  public async getItem(id: number): Promise<PostInterface> {
    const result = await this.postRepository.getById(id);
    return result;
  }

  public async updateItem(id: number, dto: UpdatePostDTO): Promise<PostInterface> {
    const postState = dto.postState ? dto.postState : PostStateEnum.Draft;
    const userId = 'bla-1234567890-bla';
    this.postEntity = new PostEntity({ ...dto, userId, postState, tagList: this.getTags(dto.tagList) });

    const result = await this.postRepository.update(id, this.postEntity);
    return result;
  }

  public async deleteItem(id: number): Promise<void>  {
   await this.postRepository.delete(id);

  }

  public async repost(id: number, userId: string): Promise<PostInterface | number> {
    const result = await this.postRepository.repost(id, userId);
    return result;
  }

  public async switchLike(id: number, userId: string): Promise<boolean> {
    const result = await this.postRepository.like(id, userId);
    return result;
  }

}
