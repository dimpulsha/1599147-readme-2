import { Body, Controller, Delete, FileTypeValidator, Get, HttpStatus, Logger, MaxFileSizeValidator, NotFoundException, Param, ParseFilePipe, ParseIntPipe, Patch, Post, Query,  UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiHeader, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { fillObject, GetUser } from '@readme/core';
import CreateCiteDTO from './dto/create-cite.dto';
import CreateLinkDTO from './dto/create-link.dto';
import CreatePhotoDTO from './dto/create-photo.dto';
import CreateTextDTO from './dto/create-text.dto';
import CreateVideoDTO from './dto/create-video.dto';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { PostApiService } from './post-api.service';
import { PostQuery } from './query/post-query';
import { PostInfoRDO } from './rdo/post-info.rdo';
import { PostListRDO } from './rdo/post-list.rdo';
import { FileInfoRDO } from './rdo/file-info.rdo';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { IMAGE_FILE_TYPE, MAX_PHOTO_SIZE } from './constants/post.constants';
import { ConfigService } from '@nestjs/config';
import { STATIC_ROOT_PATH } from '../app.constant';
import { SearchQuery } from './query/search-query';

@ApiTags('blog')
@Controller('blog')
export class PostApiController {

  constructor(private readonly postAPIService: PostApiService,
              private readonly configService: ConfigService) { }

  @Post('/video')
  @ApiOperation({ summary: 'Create new video post' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: 'The new post has been successfully created.',
    type: PostInfoRDO,
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
  })
  @ApiUnauthorizedResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })

  @UseGuards(JwtAuthGuard)
  public async createVideo(@GetUser('id') userId: string, @Body() dto: CreateVideoDTO) {
    Logger.log('Post controller: accept request for create video blog post');

    const result = await this.postAPIService.create(userId, dto);

    return fillObject(PostInfoRDO, result);
  }

  @Post('/text')
  @ApiOperation({ summary: 'Create new text post' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: 'The new post has been successfully created.',
    type: PostInfoRDO,
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
  })
  @ApiUnauthorizedResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })

  @UseGuards(JwtAuthGuard)
  public async createText(@GetUser('id') userId: string, @Body() dto: CreateTextDTO) {
    Logger.log('Post controller: accept request for create text post');

    const result = await this.postAPIService.create(userId, dto);

    return fillObject(PostInfoRDO, result);
  }

  @Post('/cite')
  @ApiOperation({ summary: 'Create new cite post' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: 'The new post has been successfully created.',
    type: PostInfoRDO,
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
  })
  @ApiUnauthorizedResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })

  @UseGuards(JwtAuthGuard)
  public async createCite(@GetUser('id') userId: string, @Body() dto: CreateCiteDTO) {
    Logger.log('Post controller: accept request for create cite post');

    const result = await this.postAPIService.create(userId, dto);

    return fillObject(PostInfoRDO, result);
  }

  @Post('/photo')
  @ApiOperation({ summary: 'Create new photo post' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: 'The new post has been successfully created.',
    type: PostInfoRDO,
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
  })
  @ApiUnauthorizedResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })

  @UseGuards(JwtAuthGuard)
  public async createPhoto(@GetUser('id') userId: string, @Body() dto: CreatePhotoDTO) {
    Logger.log('Post controller: accept request for create cite post');

    const result = await this.postAPIService.create(userId, dto);

    return fillObject(PostInfoRDO, result);
  }

  @Post('/link')
  @ApiOperation({ summary: 'Create new link post' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: 'The new post has been successfully created.',
    type: PostInfoRDO,
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
  })
  @ApiUnauthorizedResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })

  @UseGuards(JwtAuthGuard)
  public async createLink(@GetUser('id') userId: string, @Body() dto: CreateLinkDTO) {
    Logger.log('Post controller: accept request for create cite post');

    const result = await this.postAPIService.create(userId, dto);

    return fillObject(PostInfoRDO, result);
  }

  @Post('/upload')
  @ApiOperation({ summary: 'Upload post image' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: 'The file is uploaded',
    type: FileInfoRDO,
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
  })
  @ApiUnauthorizedResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  // @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFile(
    @UploadedFile(
      new ParseFilePipe(
        {
      validators: [
        new MaxFileSizeValidator({ maxSize: MAX_PHOTO_SIZE }),
        new FileTypeValidator({ fileType: IMAGE_FILE_TYPE }),
      ],
        })
    )

    file: Express.Multer.File,
    )
  {
    const result = { fileUrl: `http://localhost:4444/${STATIC_ROOT_PATH}/${file.filename}`}
    return fillObject( FileInfoRDO, result)
  }

  @Patch('/video/:id')
  @ApiOperation({ summary: 'Update video post' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @ApiBody({
    type: CreateVideoDTO
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'The post has been successfully updated.',
    type: PostInfoRDO,
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
  })
  @ApiUnauthorizedResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @UseGuards(JwtAuthGuard)
  public async updateVideo(@GetUser('id') userId: string, @Param('id', ParseIntPipe) id: number, @Body() dto: CreateVideoDTO) {
    Logger.log(`Post controller:  accept request blog/${id} for update`);

    const result = await this.postAPIService.updateItem( userId, id, dto);

    return fillObject(PostInfoRDO, result);
  }

  @Patch('/text/id:')
  @ApiOperation({ summary: 'Update new text post' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
    @ApiBody({
    type: CreateTextDTO
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'The post has been successfully updated.',
    type: PostInfoRDO,
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
  })
  @ApiUnauthorizedResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })

  @UseGuards(JwtAuthGuard)
  public async updateText(@GetUser('id') userId: string, @Param('id', ParseIntPipe) id: number, @Body() dto: CreateTextDTO) {
    Logger.log(`Post controller: accept request blog/${id} for update text post`);

    const result = await this.postAPIService.updateItem(userId, id, dto);

    return fillObject(PostInfoRDO, result);
  }

  @Patch('/cite/:id')
  @ApiOperation({ summary: 'Update cite post' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @ApiBody({
    type: CreateCiteDTO
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'The  post has been successfully updated.',
    type: PostInfoRDO,
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
  })
  @ApiUnauthorizedResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })

  @UseGuards(JwtAuthGuard)
  public async updateCite(@GetUser('id') userId: string, @Param('id', ParseIntPipe) id: number, @Body() dto: CreateCiteDTO) {
    Logger.log(`Post controller: accept request blog/${id} for update cite post`);

    const result = await this.postAPIService.updateItem(userId, id, dto);

    return fillObject(PostInfoRDO, result);
  }

  @Patch('/photo')
  @ApiOperation({ summary: 'Update photo post' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @ApiBody({
    type: CreatePhotoDTO
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'The  post has been successfully updated.',
    type: PostInfoRDO,
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
  })
  @ApiUnauthorizedResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })

  @UseGuards(JwtAuthGuard)
  public async updatePhoto(@GetUser('id') userId: string, @Param('id', ParseIntPipe) id: number, @Body() dto: CreatePhotoDTO) {
    Logger.log(`Post controller: accept request blog/${id} for update photo post`);

    const result = await this.postAPIService.updateItem(userId, id, dto);

    return fillObject(PostInfoRDO, result);
  }

  @Patch('/link/:id')
  @ApiOperation({ summary: 'Update link post' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @ApiBody({
    type: CreateLinkDTO
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'The post has been successfully updated.',
    type: PostInfoRDO,
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
  })
  @ApiUnauthorizedResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @UseGuards(JwtAuthGuard)
  public async updateLink(@GetUser('id') userId: string,  @Param('id', ParseIntPipe) id: number, @Body() dto: CreateLinkDTO) {
    Logger.log(`Post controller: accept request blog/${id} for update link post`);

    const result = await this.postAPIService.updateItem(userId, id, dto);

    return fillObject(PostInfoRDO, result);
  }

  @Get('/')
  @ApiOperation({ summary: 'Get posts list' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Posts list presented.'
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
    type: PostListRDO
  })
  public async index(@Query() query: PostQuery) {
    Logger.log('accept request for post list');

    const result = await this.postAPIService.index(query);
    return fillObject(PostListRDO, result)
  }


  @Get('/search')
  @ApiOperation({ summary: 'Search posts' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Request completed',
    type: PostListRDO,
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
  })

  public async search(@Query() query: SearchQuery) {
    Logger.log('accept request for search posts');

    const result = await this.postAPIService.search(query);
    return fillObject(PostListRDO, result)
  }

  @Get('/draft')
  @ApiOperation({ summary: 'Get user draft publications' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Publications list has been presenter.',
    type: PostInfoRDO,
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
  })
  @ApiUnauthorizedResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @UseGuards(JwtAuthGuard)
  public async getDtaft(@GetUser('id') userId: string) {
    Logger.log('accept request blog for graft list');

    const result = await this.postAPIService.getDraft(userId)

     return fillObject(PostListRDO, result)
  }


  @Get(':id')
  @ApiOperation({ summary: 'Get post' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The post information has been presented.',
    type: PostInfoRDO
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not Found',
  })
  public async getPost(@Param('id', ParseIntPipe) id: number) {
    Logger.log(`post.controller: accept request blog/${id} for read`);
    const result = await this.postAPIService.getItem(id);
    if (result) {
      return fillObject(PostInfoRDO, result)
    }

    throw new NotFoundException();

  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete post' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The post has been deleted.'
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
  })
  @ApiUnauthorizedResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @UseGuards(JwtAuthGuard)
  public async deletePost(@GetUser('id') userId: string, @Param('id', ParseIntPipe) id: number) {
    Logger.log(`accept request blog/${id} for delete`);
    await this.postAPIService.deleteItem(userId, id);
  }

  @Post('like/:id')
  @ApiOperation({ summary: 'Like post' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Like is switched.'
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
  })
  @ApiUnauthorizedResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @UseGuards(JwtAuthGuard)
  public async switchLike(@GetUser('id') userId: string, @Param('id', ParseIntPipe) id: number) {
    Logger.log('accept request blog/:id for repost');
    const result = await this.postAPIService.switchLike(userId, id)
    return result;
  }

  @Post('repost/:id')
  @ApiOperation({ summary: 'Create repost' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The repost has been created.',
    type: PostInfoRDO,
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
  })
  @ApiUnauthorizedResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @UseGuards(JwtAuthGuard)
  public async repost(@GetUser('id') userId: string, @Param('id', ParseIntPipe) id: number) {
    Logger.log('accept request blog/:id for repost');

    const result = await this.postAPIService.repost(userId, id)

    return fillObject(PostInfoRDO, result);
  }

  @Patch('publication/:id')
  @ApiOperation({ summary: 'Publication post' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'The post has been successfully published.',
    type: PostInfoRDO,
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
  })
  @ApiUnauthorizedResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @UseGuards(JwtAuthGuard)
  public async publication(@GetUser('id') userId: string, @Param('id', ParseIntPipe) id: number) {
    Logger.log(`Post controller:  accept request blog/${id} for publication`);

    const result = await this.postAPIService.publicationItem(userId, id);

    return fillObject(PostInfoRDO, result);
  }

}
