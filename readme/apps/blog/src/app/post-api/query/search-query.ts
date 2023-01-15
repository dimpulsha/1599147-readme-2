// import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { DEFAULT_SEARCH_COUNT_LIMIT } from "../constants/post.constants";

export class SearchQuery {
  @IsString()
  public searchList: string;

  // @Transform(({ value }) =>  DEFAULT_SEARCH_COUNT_LIMIT)
  @IsOptional()
  @IsNumber()
  public limit? = DEFAULT_SEARCH_COUNT_LIMIT;
}
