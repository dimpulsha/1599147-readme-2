import { SortDirection } from "@readme/shared";

export enum PostValidation {
  MinPostTitle = 20,
  MaxPostTitle = 50,
  MinPostReview = 50,
  MaxPostReview = 255,
  MinPostText = 100,
  MaxPostText = 1024,
  MinCiteText = 20,
  MaxCiteText = 300,
  MinCiteAuthor = 3,
  MaxCiteAuthor = 50,
  MaxTagsCount = 8,
  MinTagLength = 3,
  MaxTagLength = 10,
  MaxLinkDescription = 300
}

export const POST_TITLE_LENGTH_VIOLATION = `Invalid post title length: min ${PostValidation.MinPostTitle} - max ${PostValidation.MaxPostTitle}`;
export const POST_REVIEW_LENGTH_VIOLATION = `Invalid post review length: min ${PostValidation.MinPostReview} - max ${PostValidation.MaxPostReview}`;
export const POST_TEXT_LENGTH_VIOLATION = `Invalid post test length: min ${PostValidation.MinPostText} - max ${PostValidation.MaxPostText}`;
export const POST_CITE_LENGTH_VIOLATION = `Invalid cite length: min ${PostValidation.MinCiteText} - max ${PostValidation.MaxCiteText}`;
export const POST_AUTHOR_LENGTH_VIOLATION = `Invalid cite author length: min ${PostValidation.MinCiteAuthor} - max ${PostValidation.MaxCiteAuthor}`;
export const POST_TAG_LENGTH_VIOLATION = `Invalid tag length: min ${PostValidation.MinTagLength} - max ${PostValidation.MaxTagLength}`;
export const TAG_COUNT_VIOLATION = `Invalid tags count: max ${PostValidation.MaxTagsCount}`;
export const POST_LINK_DESCRIPTION_VIOLATION = `Invalid tags count: max ${PostValidation.MaxLinkDescription}`;
export const CONTENT_TYPE_VIOLATION = 'Invalid content type';
export const POST_STATE_VIOLATION = 'Invalid post state';

export const DEFAULT_POST_COUNT_LIMIT = 25;
export const DEFAULT_SEARCH_COUNT_LIMIT = 20;

export const DEFAULT_SORT_DIRECTION = SortDirection.SortDesc;

export enum SortKind {
  SortByLike = 'likeCount',
  SortByComments = 'commentCount',
  SortByDate = 'publicationDate'
}

export const RABBITMQ_BLOG_SERVICE = Symbol('RABBITMQ_BLOG_SERVICE');
export const RABBITMQ_USER_SERVICE = Symbol('RABBITMQ_USER_SERVICE');

export const POST_URL_BASE = 'http://localhost:4444/api/blog/';

export const MAX_PHOTO_SIZE = 1024 * 1024;
export const IMAGE_FILE_TYPE = /image\/(jpeg|png)$/;
