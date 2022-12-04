import { UserInterface } from "@readme/shared";
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
  public firstName: string;

  @Prop({
    required: true,
  })
  public lastName: string;

  @Prop()
  public avatarImg: string;

  @Prop({
    required: true,
  })
  public publicationCount: number;

  @Prop({
    required: true,
  })
  public friends: number;

  @Prop({
    required: true,
  })
  public registrationDate: Date;

  @Prop({
    required: true,
  })
  public passwordHash: string;
}

export const BlogUserSchema = SchemaFactory.createForClass(BlogUserModel)
