import { Injectable} from '@nestjs/common';
import * as dayjs from 'dayjs';
import { PostMemoryRepository } from '../post-storage/post-memory.repository';
import { PostKind } from '@readme/shared';
import { CreateVideoDTO, CreateTextDTO, CreateCiteDTO, CreatePhotoDTO, CreateLinkDTO} from './dto/create.dto';
import { PostEntity } from '../post-storage/post-entity';
import { PostState } from '@readme/shared';

@Injectable()
export class PostApiService {

  constructor(
    private readonly postMemoryRepository: PostMemoryRepository
  ) { }

  private postEntity: PostEntity;

  private readonly emptyPost = {
    userId: 1234567890,
    postKind: null,
    postName: null,
    postReview: null,
    postText: null,
    linkURL: null,
    photoLink: null,
    linkDescription: null,
    citeAuthor: null,
    isRepost: false,
    originUserId: 0,
    originPostId: 0,
    likeCount: 0,
    commentCount: 0,
    repostCount: 0,
    postState: PostState.Published,
    createDate: dayjs().toDate(),
    publicationDate: dayjs().toDate(),
    tagList: []
  }

  private fillVideo(dto: CreateVideoDTO): PostEntity {
    const newPost = this.emptyPost;
    newPost.postName = dto.postName;
    newPost.linkURL = dto.linkURL;
    // todo
    // newPost.tagList = dto.tagList;
    return new PostEntity(newPost);
  }

  private fillText(dto: CreateTextDTO): PostEntity {
    const newPost = this.emptyPost;
    newPost.postName = dto.postName;
    newPost.postReview = dto.postReview;
     newPost.postText = dto.postText;
    //  todo
    // newPost.tagList = dto.tagList;
    return new PostEntity(newPost);
  }

  private fillCite(dto: CreateCiteDTO): PostEntity {
    const newPost = this.emptyPost;
    newPost.citeAuthor = dto.citeAuthor;
    newPost.postText = dto.postText;
    //  todo
    // newPost.tagList = dto.tagList;
    return new PostEntity(newPost);
  }

  private fillPhoto(dto: CreatePhotoDTO): PostEntity {
    const newPost = this.emptyPost;
    newPost.photoLink = dto.photoLink;
    //  todo
    // newPost.tagList = dto.tagList;
    return new PostEntity(newPost);
  }

  private fillLink(dto: CreateLinkDTO): PostEntity {
    const newPost = this.emptyPost;
    newPost.linkURL = dto.linkURL;
    newPost.linkDescription = dto.linkDescription;
    //  todo
    // newPost.tagList = dto.tagList;
    return new PostEntity(newPost);
  }


  async create(dto, postKind: PostKind) {
    switch (postKind)  {
      case PostKind.Video:
        this.postEntity = this.fillVideo(dto);
        break;
      case PostKind.Text:
        this.postEntity = this.fillText(dto);
        break;
      case PostKind.Cite:
        this.postEntity = this.fillCite(dto);
        break;
      case PostKind.Photo:
        this.postEntity = this.fillPhoto(dto);
        break;
      case PostKind.Link:
        this.postEntity = this.fillLink(dto);
        break;
      default: throw new Error('Unknown PostKind');
    }

    return await this.postMemoryRepository.create(this.postEntity);
  }

}
