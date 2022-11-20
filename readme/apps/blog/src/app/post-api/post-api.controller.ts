import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Logger, Param, Patch, Post, Query } from '@nestjs/common';
import { PostKind } from '@readme/shared';
import { CreateVideoDTO, CreateTextDTO, CreateCiteDTO, CreatePhotoDTO, CreateLinkDTO} from './dto/create.dto';
import { PostApiService } from './post-api.service';
const METHOD_NOT_IMPLEMENTED = 'Method not implemented';

@Controller('blog')
export class PostApiController {

  constructor(private readonly postAPIService: PostApiService) { }

  @Post()
  public async create(@Body() dto: CreateVideoDTO | CreateTextDTO | CreateCiteDTO | CreatePhotoDTO | CreateLinkDTO, @Query('postKind') postKind: PostKind) {
    Logger.log('accept request blog/ for create blog post');
    this.postAPIService.create(dto, postKind);
  }

  @Get()
  public async index(@Query() {startCount, endCount, sortKind, sortDirection }) {
    Logger.log('accept request blog/ for post list');
    Logger.log(`${startCount}, ${endCount}, ${sortKind}, ${sortDirection}`);

    await this.postAPIService.index();
  }

  @Get(':id')
  public async getPost(@Param('id') id: string) {
    Logger.log('accept request blog/:id for read');
    Logger.log(id);
    return (`${METHOD_NOT_IMPLEMENTED} ${id}`);
  }

  @Patch(':id')
  public async updatePost(@Param('id') id: string) {
    Logger.log('accept request blog/:id for update');
    Logger.log(id);
    return (`${METHOD_NOT_IMPLEMENTED} ${id}`);
  }

  @Delete(':id')
  public async deletePost(@Param('id') id: string) {
    Logger.log('accept request blog/:id for delete');
    Logger.log(id);
    return (`${METHOD_NOT_IMPLEMENTED} ${id}`);
  }

  @Post('like/:id')
  @HttpCode(HttpStatus.OK)
  public async likePost(@Param('id') id: string) {
    Logger.log('accept request blog/:id for change like');
    Logger.log(id);
    return (`${METHOD_NOT_IMPLEMENTED}  ${id}`);
  }

  @Post('repost/:id')
  @HttpCode(HttpStatus.OK)
  public async repost(@Param('id') id: string) {
    Logger.log('accept request blog/:id for repost');
    Logger.log(id);
    return (`${METHOD_NOT_IMPLEMENTED}  ${id}`);
  }
}
