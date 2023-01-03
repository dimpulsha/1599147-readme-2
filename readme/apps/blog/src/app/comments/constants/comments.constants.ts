import { SortDirection } from "@readme/shared";

export enum CommentsValidation {
  MinContentLength = 3,
  MaxContentLength = 50,
}

export const COMMENT_LENGTH_VIOLATION = `Invalid comment length: min ${CommentsValidation.MinContentLength} - max ${CommentsValidation.MaxContentLength}`;

export const DEFAULT_COMMENT_COUNT_LIMIT = 50;

export const DEFAULT_SORT_DIRECTION = SortDirection.SortDesc;


