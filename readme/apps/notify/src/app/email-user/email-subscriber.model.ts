import { SubscriberInterface } from '@readme/shared'
import { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
  collection: 'email-subscribers',
  timestamps: true
})
export class SubscriberModel extends Document implements SubscriberInterface {

  @Prop({
    required: true,
    unique: true
  })
  public id: string;

  @Prop({
    required: true,
    unique: true
  })
  public email: string;

  @Prop({
    required: true,
  })
  public userName: string;
}

export const SubscriberSchema = SchemaFactory.createForClass(SubscriberModel)

