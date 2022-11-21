import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, Query } from '@nestjs/common';
import { CommentsApiService } from './comments-api.service';
import { CreateCommentsDTO } from './dto/create-comments.dto';
const METHOD_NOT_IMPLEMENTED = 'Method not implemented';


@Controller('comments')
export class CommentsApiController {

  constructor(
    private readonly commentsService: CommentsApiService
  ) {}

  @Post(':postId')
  public async create(@Body() dto: CreateCommentsDTO, @Param('postId') postId: string) {

    Logger.log('accept request blog/ for post list');
    Logger.log(`${dto}, ${postId}`);
    return this.commentsService.create(dto, parseInt(postId));
  }

  @Get(':postId')
  public async index(@Param('postId') postId: string, @Query() {startCount, endCount }) {
    Logger.log('accept request blog/ for post list');
    Logger.log(`${postId}, ${startCount}, ${endCount}`);
    return this.commentsService.getList(parseInt(postId));
  }

  @Delete('delete/:id')
  public async delete(@Param('id') id: string) {
    Logger.log('accept request blog/ for post list');
    Logger.log(`${id}`);
    return (METHOD_NOT_IMPLEMENTED);
  }

  @Patch('patch/:id')
  public async update(@Param('id') id: string) {
    Logger.log('accept request blog/ for post list');
    Logger.log(`${id}`);
    return (METHOD_NOT_IMPLEMENTED);
  }

}
