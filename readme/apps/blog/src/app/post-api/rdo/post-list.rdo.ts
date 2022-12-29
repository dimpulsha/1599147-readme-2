import { Expose } from 'class-transformer';
import { ContentInterface, ContentTypeInterface } from '@readme/shared';
import { ApiProperty } from '@nestjs/swagger';

export class PostListRDO {

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
  public contentType: ContentTypeInterface;

  @ApiProperty({
    description: 'Post Content',
    example: ''
   })
  @Expose()
  public content: ContentInterface;

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

}
