import { PostNotifyInterface } from '@readme/shared'
import { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({
  collection: 'posts-to-email',
  timestamps: true
})
export class PostNotifyModel extends Document implements PostNotifyInterface {

  @Prop({
    required: true,
    unique: true
  })
  public url: string;

  @Prop({
    required: true,
    unique: true
  })
  public id: number;

}

export const PostNotifySchema = SchemaFactory.createForClass(PostNotifyModel)
