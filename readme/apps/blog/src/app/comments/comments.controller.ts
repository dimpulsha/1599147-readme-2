import { Body, Controller, Delete, Get, HttpStatus, Logger, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiHeader, ApiOperation, ApiQuery, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { fillObject, GetUser } from '@readme/core';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { CommentService } from './comment.service';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { UpdateCommentDTO } from './dto/update-comment.dto';
import { CommentsQuery } from './query/comments-query';
import { CommentRDO } from './rdo/comment.rdo';

@ApiTags('comment')
@Controller('comment')
export class CommentController {

    constructor(private readonly commentService: CommentService) { }

  @Post(':postId')
  @ApiOperation({ summary: 'Create new comment' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new comment has been successfully created.',
    type: CommentRDO,
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
    public async create(@GetUser('id') userId: string, @Param('postId', ParseIntPipe) postId: number, @Body() dto: CreateCommentDTO) {
        Logger.log('accept request blog/ for create blog post');

        const result = await this.commentService.create(dto, postId, userId);

        return fillObject(CommentRDO, result)
    }

  @Get(':postId')
  @ApiOperation({ summary: 'Get comment list' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Comments list presented.',
    type: CommentRDO,
  })
  @ApiBadRequestResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Bad Request',
    })
  @ApiQuery({
    type: CommentsQuery
  })
    public async index(@Param('postId', ParseIntPipe) postId: number, @Query() query: CommentsQuery) {
        Logger.log('accept request blog/ for post list');

    const result = await this.commentService.index(query, postId);
     return fillObject(CommentRDO, result)
    }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Update comment' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @ApiResponse({
      status: HttpStatus.OK,
    description: 'The post has been updated.',
    type: CommentRDO,
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
  public async updatePost(@GetUser('id') userId: string, @Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCommentDTO) {
      Logger.log(`accept request blog/${id} for update`);
      const result = await this.commentService.updateItem(id, dto, userId);
      return fillObject(CommentRDO, result)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete comment' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @ApiResponse({
      status: HttpStatus.OK,
      description: 'The comment has been deleted.'
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
      Logger.log(`accept request comment ${id} for delete`);
      await this.commentService.deleteItem(id, userId);
  }
}
