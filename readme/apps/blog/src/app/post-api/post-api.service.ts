import { Injectable} from '@nestjs/common';
import { CreatePostDTO } from './dto/create-post.dto';
import { PostEntity } from '../post-storage/post-entity';
import { PostInterface, PostStateEnum } from '@readme/shared';
import { PostRepository } from '../post-storage/post.repository';
import { UpdatePostDTO } from './dto/update-post.dto';

@Injectable()
export class PostApiService {

  constructor(
    private readonly postRepository: PostRepository
  ) { }

  private postEntity: PostEntity;

  private getSplitTags(tags: string): string[] {
    const tagList = tags ? tags.split(' ') : []
    return tagList
  }

  public async create(dto: CreatePostDTO): Promise<PostInterface> {
    const userId = 'bla-1234567890-bla';
    const postState = dto.postState ? dto.postState : PostStateEnum.Draft;
    this.postEntity = new PostEntity({ ...dto, userId, postState, tagList: this.getSplitTags(dto.tagList) });
    const result = await this.postRepository.create(this.postEntity);
    return result;
  }

  public async index() {
    const result = await this.postRepository.getItemList();
    return result;
  }

  public async getItem(id: number): Promise<PostInterface> {
    const result = await this.postRepository.getById(id);
    return result;
  }

  public async updateItem(id: number, dto: UpdatePostDTO): Promise<PostInterface> {
    const postState = dto.postState ? dto.postState : PostStateEnum.Draft;
    const userId = 'bla-1234567890-bla';
    this.postEntity = new PostEntity({ ...dto, userId, postState, tagList: this.getSplitTags(dto.tagList) });

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
