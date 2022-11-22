import { Expose } from 'class-transformer';
import { ContentType } from '@readme/shared';
import { ApiProperty } from '@nestjs/swagger';

export class PostInfoRDO {

  @ApiProperty({
     description: 'The uniq publication ID',
     example: '1234567890'
   })
  @Expose()
  public id: number;

  @ApiProperty({
     description: 'The uniq user ID',
     example: '1ca630bedee5485068bgc80ca5a57edc'
   })
  @Expose()
  public userId: number;

  @ApiProperty({
     description: 'Type of content',
     example: 'video'
   })
  @Expose()
  public contentType: ContentType;

  @ApiProperty({
     description: 'Name of publication',
     example: 'The best story'
   })
  @Expose()
  public postName?: string;

  @ApiProperty({
     description: 'Review of content',
     example: 'The story about my cat'
   })
  @Expose()
  public postReview?: string;

  @ApiProperty({
     description: 'Publication content',
     example: 'Lorem ipsum'
   })
  @Expose()
  public postText?: string;

  @ApiProperty({
     description: 'Link to video or web-page',
     example: 'https://test.test/1234/5433'
   })
  @Expose()
  public linkURL?: string;

  @ApiProperty({
     description: 'Link to picture',
     example: 'https://test.test/1234/5433'
   })
  @Expose()
  public photoLink?: string;

  @ApiProperty({
     description: 'Description of link',
     example: 'The link to page'
   })
  @Expose()
  public linkDescription?: string;

  @ApiProperty({
     description: 'Author of cite',
     example: 'My dad'
   })
  @Expose()
  public citeAuthor?: string;

  @ApiProperty({
     description: 'Repost indicator',
     example: 'false'
   })
  @Expose()
  public isRepost: boolean;

  @ApiProperty({
     description: 'Number of likes',
     example: '100'
   })
  @Expose()
  public likeCount: number;

  @ApiProperty({
     description: 'Number of comments',
     example: '10'
   })
  @Expose()
  public commentCount: number;

 @ApiProperty({
     description: 'Publication date',
     example: '2022-11-22'
   })
  @Expose()
  public publicationDate: Date;

  @ApiProperty({
     description: 'Array of publication tags',
     example: ['#dogs', '#cats', '#chicken']
   })
  @Expose()
  public tagList: string[];
}
