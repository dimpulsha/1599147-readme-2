import { ContentTypeEnum, SortDirection } from '@readme/shared';
import { Transform } from 'class-transformer';
import { IsArray, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { DEFAULT_POST_COUNT_LIMIT, SortKind } from '../constants/post.constants';

export class PostQuery {

  @Transform(({ value }) => +value || DEFAULT_POST_COUNT_LIMIT)
  @IsOptional()
  @IsNumber()
  public limit? = DEFAULT_POST_COUNT_LIMIT;


  @Transform(({ value }) => value || SortDirection.SortDesc)
  @IsOptional()
  @IsEnum(SortDirection)
  public sortDirection? = SortDirection.SortDesc;

  @Transform(({ value }) => +value)
  @IsOptional()
  @IsNumber()
  public page?: number;

  @Transform(({ value }) => value.split(','))
  @IsOptional()
  @IsArray()
  public tag?: string[];

  @IsOptional()
  @IsEnum(ContentTypeEnum)
  public contentType?: ContentTypeEnum;

  @Transform(({ value }) => value || SortKind.SortByDate)
  @IsOptional()
  @IsEnum(SortKind)
  public sortKind? = SortKind.SortByDate;

  @IsOptional()
  @IsString()
  public userId?: string;

}


