import { Body, Controller, Delete, Get, HttpStatus, Logger, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject, GetUser } from '@readme/core';
import { CreatePostDTO } from './dto/create-post.dto';
import { UpdatePostDTO } from './dto/update-post.dto';
import { JwtAuthGuard } from './guards/jwt.guard';
import { PostApiService } from './post-api.service';
import { PostQuery } from './query/post-query';
import { PostInfoRDO } from './rdo/post-info.rdo';
import { PostListRDO } from './rdo/post-list.rdo';

@ApiTags('blog')
@Controller('blog')
export class PostApiController {

  constructor(private readonly postAPIService: PostApiService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiResponse({
    // todo - update type: UserInfoRDO,
    status: HttpStatus.CREATED,
    description: 'The new post has been successfully created.'
  })
  public async create(@GetUser('id') userId: string, @Body() dto: CreatePostDTO) {
    Logger.log('accept request blog/ for create blog post');

    console.log(userId);

    const result = await this.postAPIService.create(dto);

    return fillObject(PostInfoRDO, result)

  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Posts list presented.'
  })
  public async index(@Query() query: PostQuery) {
    Logger.log('accept request blog/ for post list');

    const result = await this.postAPIService.index(query);
    return fillObject(PostListRDO, result)
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The post information has been presented.'
  })
  public async getPost(@Param('id') id: number) {
    Logger.log(`post.controller: accept request blog/${id} for read`);
    const result = await this.postAPIService.getItem(id);
    // todo - если null, то 404
    return fillObject(PostInfoRDO, result)

  }

  @Patch(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The post has been updated.'
  })
  public async updatePost(@Param('id') id: number, @Body() dto: UpdatePostDTO) {
    Logger.log(`accept request blog/${id} for update`);
    const result = await this.postAPIService.updateItem(id, dto);
    return fillObject(PostInfoRDO, result)

  }

  @Delete(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The post has been deleted.'
  })
  public async deletePost(@Param('id') id: number) {
    Logger.log(`accept request blog/${id} for delete`);
    await this.postAPIService.deleteItem(id);
  }

  @Post('like/:id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Like is switched.'
  })
  public async switchLike(@Param('id') id: number) {
    Logger.log('accept request blog/:id for repost');
    const userId = 'bla-1234567890-bla-4';

    const result = await this.postAPIService.switchLike(id, userId)

    return result;
  }

  @Post('repost/:id')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The repost has been created.'
  })
  public async repost(@Param('id') id: number) {
    Logger.log('accept request blog/:id for repost');
    const userId = 'bla-1234567890-bla-2';

    const result = await this.postAPIService.repost(id, userId)

    if (result instanceof Number) {
      return result;
    }

    return fillObject(PostInfoRDO, result);

  }
}
