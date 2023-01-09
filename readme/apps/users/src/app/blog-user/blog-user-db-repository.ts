import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { BlogUserModel } from "./blog-user.model";
import { UserInterface } from "@readme/shared";
import { BlogUserEntity } from "./blog-user.entity";
import { CRUDInterface } from "@readme/core";
import { Model } from "mongoose";

@Injectable()
export class BlogUserDBRepository implements CRUDInterface<BlogUserEntity, string, UserInterface> {

  constructor(
    @InjectModel(BlogUserModel.name) private readonly blogUserModel: Model<BlogUserModel>
  ) { }

  public async create(item: BlogUserEntity): Promise<UserInterface> {
    const result = new this.blogUserModel(item);
    Logger.log(`user ${item.email} created`);
    return result.save();
  }

  public async getById(id: string): Promise<UserInterface> {
    const result = this.blogUserModel.findById({ _id: id }).exec();
    Logger.log(`find by id = ${id}`);
    return result;
  }

  public async update(id: string, item: BlogUserEntity): Promise<UserInterface> {
    const result = this.blogUserModel.findByIdAndUpdate(id, item.toObject(), { new: true }).exec()
    Logger.log(`update user. id = ${id}`);
    return result;
  }

  public async delete(id: string): Promise<void> {
    this.blogUserModel.deleteOne({ _id: id }).exec();
    Logger.log(`delete user. id = ${id}`);
  }

  public async getByEmail(email: string): Promise<UserInterface | null> {
    const result = this.blogUserModel.findOne({ email }).exec();
    Logger.log(`find user by email. email = ${email}`);

    if (result) {
      return result;
    }
    return null;
  }

  public async addFriend(id: string, friendId: string): Promise<UserInterface> {
    // const friend = await this.getById(friendId);

    const result = await this.blogUserModel.findByIdAndUpdate({ _id: id }, {$inc: {friendsCount: 1}, $addToSet: { friends: { friendId } } }, { new: true }).exec();
    // console.log(result);
    return result;
  }

  public async removeFriend(id: string, friendId: string): Promise<UserInterface> {
    const result = await this.blogUserModel.findByIdAndUpdate({ _id: id }, { $inc: { friendsCount: -1 }, $pull: { friends: {friendId: friendId } } }, { new: true }).exec();

    // console.log(result);
    return result;
  }
}

