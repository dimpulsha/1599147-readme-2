import { SortDirection } from '@readme/shared';
import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { DEFAULT_COMMENT_COUNT_LIMIT } from '../constants/comments.constants';

export class CommentsQuery {

  @Transform(({ value }) => +value || DEFAULT_COMMENT_COUNT_LIMIT)
  @IsOptional()
  @IsNumber()
  public limit?= DEFAULT_COMMENT_COUNT_LIMIT;

  @Transform(({ value }) => +value)
  @IsOptional()
  @IsNumber()
  public page?: number;

  @Transform(({ value }) => value || SortDirection.SortDesc)
  @IsOptional()
  @IsEnum(SortDirection)
  public sortDirection?= SortDirection.SortDesc;

}
