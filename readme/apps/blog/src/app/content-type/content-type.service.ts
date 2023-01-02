import { ContentTypeInterface } from '@readme/shared';
import { Injectable } from '@nestjs/common';
import { PostContentTypeRepository } from './content-type.repository';
import { PostContentTypeEntity } from './content-type.entity';
import { CreateContentTypeDTO } from '../content-type/dto/create-content-type.dto';
import { UpdateContentTypeDTO } from './dto/update-content-type.dto';

@Injectable()
export class PostContentTypeService {
  constructor(
    private readonly contentTypeRepository: PostContentTypeRepository
  ) {}

  public async createContentType(dto: CreateContentTypeDTO): Promise<ContentTypeInterface> {
    const contentTypeEntity = new PostContentTypeEntity(dto);

    return this.contentTypeRepository.create(contentTypeEntity);
  }

  async deleteContentType(id: number): Promise<void> {
    this.contentTypeRepository.delete(id);
  }

  async getContentTypeList(): Promise<ContentTypeInterface[]> {
    return this.contentTypeRepository.find();
  }

  async updateContentType(id: number, dto: UpdateContentTypeDTO): Promise<ContentTypeInterface> {
    return this.contentTypeRepository.update(id, new PostContentTypeEntity(dto));
  }
}
