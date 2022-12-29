import { Body, Controller, Delete, Get, HttpStatus, Logger, Param, Patch, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject } from '@readme/core';
import { CommentService } from './comment.service';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { UpdateCommentDTO } from './dto/update-comment.dto';
import { CommentRDO } from './rdo/comment.rdo';

@ApiTags('commeent')
@Controller('comment')
export class CommentController {

    constructor(private readonly commentService: CommentService) { }

    @Post(':postId')
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'The new comment has been successfully created.'
    })
    public async create(@Param('postId') postId: string,@Body() dto: CreateCommentDTO) {
        Logger.log('accept request blog/ for create blog post');
        const formattedPostId = parseInt(postId, 10)
        console.log(postId);
        console.log(dto);
        console.log(formattedPostId);

        const result = await this.commentService.create(dto, formattedPostId);

        return fillObject(CommentRDO, result)

    }

    @Get()
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Comments list presented.'
    })
    public async index() {
        Logger.log('accept request blog/ for post list');

        const result = await this.commentService.index();
        return fillObject(CommentRDO, result)
    }

      @Get(':postId')
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'The post information has been presented.'
    })
    public async getComment(@Param('postId') postId: string) {
        Logger.log(`post.controller: accept request blog/${postId} for read`);
        const formattedPostId = parseInt(postId, 10)
        const result = await this.commentService.getItem(formattedPostId);
        // todo - если null, то 404
        return fillObject(CommentRDO, result)
      }

    @Patch(':id')
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'The post has been updated.'
    })
    public async updatePost(@Param('id') id: string, @Body() dto: UpdateCommentDTO) {
        Logger.log(`accept request blog/${id} for update`);
        const commentId = parseInt(id, 10);
        const result = await this.commentService.updateItem(commentId, dto);
        return fillObject(CommentRDO, result)

    }

    @Delete(':id')
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'The post has been deleted.'
    })
    public async deletePost(@Param('id') id: string) {
        Logger.log(`accept request blog/${id} for delete`);
        const commentId = parseInt(id, 10);

        await this.commentService.deleteItem(commentId);
    }
}
