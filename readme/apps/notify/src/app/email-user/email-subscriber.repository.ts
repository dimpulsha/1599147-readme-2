import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CRUDInterface } from "@readme/core";
import { SubscriberInterface } from "@readme/shared";
import { Model } from "mongoose";
import { SubscriberEntity } from "./email-subscriber.entity";
import { SubscriberModel } from "./email-subscriber.model";

@Injectable()
export class EmailSubscriberRepository implements CRUDInterface<SubscriberEntity, string, SubscriberInterface> {

  constructor(
    @InjectModel(SubscriberModel.name) private readonly subscriberModel: Model<SubscriberModel>
  ) { }

  public async create(item: SubscriberEntity): Promise<SubscriberInterface> {
    const result = new this.subscriberModel(item);
    Logger.log(`user ${item.email} created`);
    return result.save();
  }
  public async getById(id: string): Promise<SubscriberInterface> {
    const result = this.subscriberModel.findById({ id }).exec();
    Logger.log(`find by id = ${id}`);
    return result;
  }
  public async update(id: string, item: SubscriberEntity): Promise<SubscriberInterface> {
    const result = this.subscriberModel.findByIdAndUpdate(id, item.toObject(), { new: true }).exec()
    Logger.log(`update user. id = ${id}`);
    return result;
  }
  public async delete(id: string): Promise<void> {
    this.subscriberModel.deleteOne({ id }).exec();
    Logger.log(`delete user. id = ${id}`);
  }
  public async getByEmail(email: string): Promise<SubscriberInterface | null> {
    const result = this.subscriberModel.findOne({ email }).exec();
    Logger.log(`find user by email. email = ${email}`);

    if (result) {
      return result;
    }
    return null;

  }

  public async getList(): Promise<SubscriberInterface[]> {
    const result = this.subscriberModel.find().exec();
    Logger.log(`Subscriber Repository: find list`);
    return result;
  }
}
