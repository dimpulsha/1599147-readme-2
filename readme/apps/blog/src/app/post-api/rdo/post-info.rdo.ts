import { Expose } from 'class-transformer';
import { ContentInterface, ContentTypeInterface } from '@readme/shared';
import { PostStateEnum } from '@readme/shared';
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
  public userId: string;

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
     description: 'Repost indicator',
     example: 'false'
   })
  @Expose()
  public isRepost: boolean;

  @ApiProperty({
     description: 'Reposted publication owner Id',
     example: '1ca630bedee5485068bgc80ca5a57edc'
   })
  @Expose()
  public originUserId?: string;

  @ApiProperty({
     description: 'Reposted publication origin Id',
     example: '1ca630bedee5485068bgc80ca5a57edc'
   })
  @Expose()
  public originPostId?: number;

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
     description: 'Number of reposts',
     example: '5'
   })
  @Expose()
  public repostCount: number;

  @ApiProperty({
     description: 'Publication State',
     example: 'draft'
   })
  @Expose()
  public postState: PostStateEnum;

  @ApiProperty({
     description: 'Create date',
     example: '2022-11-21'
   })
  @Expose()
  public createDate: Date;

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
