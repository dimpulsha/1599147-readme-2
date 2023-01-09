import { FriendInterface, UserInterface } from "@readme/shared";
import { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({
  collection: 'users'
})
export class BlogUserModel extends Document implements UserInterface {

  @Prop({
    required: true,
    unique: true
  })
  public email: string;

  @Prop({
    required: true,
  })
  public userName: string;

  @Prop()
  public avatarImg: string;

  @Prop({
    required: true,
  })
  public publicationCount: number;

  @Prop({
    default: 0,
    required: true,
  })
  public friendsCount: number;

  @Prop({
    required: true,
  })
  public registrationDate: Date;

  @Prop({
    required: true,
  })
  public passwordHash: string;

  @Prop({
    default: [],
  })
  public friends: FriendInterface[]
}

export const BlogUserSchema = SchemaFactory.createForClass(BlogUserModel)
