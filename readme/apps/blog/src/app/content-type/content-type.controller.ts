import { Body, Post, Controller, Delete, Param, HttpCode, HttpStatus, Get, Patch } from '@nestjs/common';
import { fillObject } from '@readme/core';
import { PostContentTypeService } from './content-type.service';
import { CreateContentTypeDTO } from './dto/create-content-type.dto';
import { UpdateContentTypeDTO } from './dto/update-content-type.dto';
import { ContentTypeRDO } from './rdo/content-type.rdo';

@Controller('content-type')
export class PostContentTypeController {
  constructor(
    private readonly contentTypeService: PostContentTypeService
  ) {}

  @Get('/')
  async index() {
    const contentTypeList = await this.contentTypeService.getContentTypeList();
    return fillObject(ContentTypeRDO, contentTypeList);
  }

  @Post('/')
  async create(@Body() dto: CreateContentTypeDTO) {
    const newContentType = await this.contentTypeService.createContentType(dto);
    return fillObject(ContentTypeRDO, newContentType);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id') id: string) {
    const contentTypeId = parseInt(id, 10);
    this.contentTypeService.deleteContentType(contentTypeId);
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() dto: UpdateContentTypeDTO) {
    const contentTypeId = parseInt(id, 10);
    const updatedContentType = await this.contentTypeService.updateContentType(contentTypeId, dto)
    return fillObject(ContentTypeRDO, updatedContentType);
  }
}
