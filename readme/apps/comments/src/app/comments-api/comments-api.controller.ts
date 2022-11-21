import { Body, Controller, Delete, Get, HttpStatus, Logger, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommentsApiService } from './comments-api.service';
import { CreateCommentsDTO } from './dto/create-comments.dto';
const METHOD_NOT_IMPLEMENTED = 'Method not implemented';

@ApiTags('comments')
@Controller('comments')
export class CommentsApiController {

  constructor(
    private readonly commentsService: CommentsApiService
  ) {}

  @Post(':postId')
  @ApiResponse({
    // todo - update type: UserInfoRDO,
    status: HttpStatus.CREATED,
    description: 'The new comment has been successfully created.'
  })
  public async create(@Body() dto: CreateCommentsDTO, @Param('postId') postId: string) {

    Logger.log('accept request blog/ for post list');
    Logger.log(`${dto}, ${postId}`);
    return this.commentsService.create(dto, parseInt(postId));
  }

  @Get(':postId')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The comments list has been presented'
  })
  public async index(@Param('postId') postId: string, @Query() {startCount, endCount }) {
    Logger.log('accept request blog/ for post list');
    Logger.log(`${postId}, ${startCount}, ${endCount}`);
    return this.commentsService.getList(parseInt(postId));
  }

  @Delete('delete/:id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The comment has been successfully deleted.'
  })
  public async delete(@Param('id') id: string) {
    Logger.log('accept request blog/ for post list');
    Logger.log(`${id}`);
    return (METHOD_NOT_IMPLEMENTED);
  }

  @Patch('patch/:id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The new comment has been successfully updated.'
  })
  public async update(@Param('id') id: string) {
    Logger.log('accept request blog/ for post list');
    Logger.log(`${id}`);
    return (METHOD_NOT_IMPLEMENTED);
  }

}

