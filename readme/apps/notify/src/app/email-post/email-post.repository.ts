import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CRUDInterface } from "@readme/core";
import { PostNotifyInterface } from "@readme/shared";
import { Model } from "mongoose";
import { PostNotifyEntity } from "./email-post.entity";
import { PostNotifyModel } from "./email-post.model";

@Injectable()
export class PostNotifyRepository implements CRUDInterface<PostNotifyEntity, number, PostNotifyInterface> {

  constructor(
    @InjectModel(PostNotifyModel.name) private readonly postModel: Model<PostNotifyModel>
  ) { }

  public async create(item: PostNotifyEntity): Promise<PostNotifyInterface> {
    const result = new this.postModel(item);
    Logger.log(`create id = ${result.id}`);

    return result.save();
  }
  public async getById(id: number): Promise<PostNotifyInterface> {
    const result = await this.postModel.findById({ id: id }).exec();
    Logger.log(`find by id = ${id}`);
    return result;
  }
  public async update(id: number, item: PostNotifyEntity): Promise<PostNotifyInterface> {
    const result = await this.postModel.findByIdAndUpdate(id, item.toObject(), { new: true }).exec()
    Logger.log(`update post. id = ${id}`);
    return result;
  }
  public async delete(id: number): Promise<void> {
    this.postModel.deleteOne({ id }).exec();
    Logger.log(`delete post. id = ${id}`);
  }

  public async getList(): Promise<PostNotifyInterface[]> {
    const result = await this.postModel.find().exec();
    Logger.log(`PostNotifyRepository: find post list`);
    return result;
  }

  public async clear(): Promise<void>{
    await this.postModel.remove({})
  }

}
