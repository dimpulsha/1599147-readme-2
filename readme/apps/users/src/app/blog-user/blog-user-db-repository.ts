import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { BlogUserModel } from "./blog-user.model";
import { UserInterface } from "@readme/shared";
import { BlogUserEntity } from "./blog-user.entity";
import { CRUDInterface } from "@readme/core";
import { Model } from "mongoose";

@Injectable()
export class BlogUserDBRepository implements CRUDInterface<BlogUserEntity, string, UserInterface> {

  private readonly logger = new Logger(BlogUserDBRepository.name);

  constructor(
    @InjectModel(BlogUserModel.name) private readonly blogUserModel: Model<BlogUserModel>
  ) { }

  public async create(item: BlogUserEntity): Promise<UserInterface> {
    const result = new this.blogUserModel(item);
    this.logger.log(`user ${item.email} created`);
    return result.save();
  }

  public async getById(id: string): Promise<UserInterface> {
    const result = this.blogUserModel.findById({ _id: id }).exec();
    this.logger.log(`find by id = ${id}`);
    return result;
  }

  public async update(id: string, item: BlogUserEntity): Promise<UserInterface> {
    const result = this.blogUserModel.findByIdAndUpdate(id, item.toObject(), { new: true }).exec()
    this.logger.log(`update user. id = ${id}`);
    return result;
  }

  public async updateImg(id: string, fileUrl: string): Promise<UserInterface> {
    const item = await this.blogUserModel.findById({ _id: id }).exec();
    item.avatarImg = fileUrl;
    const result = this.blogUserModel.findByIdAndUpdate(id, item, { new: true }).exec()
    this.logger.log(`update user avatar . id = ${id}`);
    return result;
  }

  public async delete(id: string): Promise<void> {
    this.blogUserModel.deleteOne({ _id: id }).exec();
    this.logger.log(`delete user. id = ${id}`);
  }

  public async getByEmail(email: string): Promise<UserInterface | null> {
    const result = this.blogUserModel.findOne({ email }).exec();
    this.logger.log(`find user by email. email = ${email}`);

    if (result) {
      return result;
    }
    return null;
  }

  public async addFriend(id: string, friendId: string): Promise<UserInterface> {

    const result = await this.blogUserModel.findByIdAndUpdate({ _id: id }, {$inc: {friendsCount: 1}, $addToSet: { friends: { friendId } } }, { new: true }).exec();
    return result;
  }

  public async removeFriend(id: string, friendId: string): Promise<UserInterface> {
    const result = await this.blogUserModel.findByIdAndUpdate({ _id: id }, { $inc: { friendsCount: -1 }, $pull: { friends: {friendId: friendId } } }, { new: true }).exec();

    return result;
  }

  public async incPostStat(id: string): Promise<void> {
    this.logger.log(`Increment post count. UserId = ${id}`, 'User Repository');
     await this.blogUserModel.findByIdAndUpdate({ _id: id }, {$inc: {publicationCount: 1}, }, { new: true }).exec();
  }

  public async decPostStat(id: string): Promise<void> {
    this.logger.log(`Decrement post count. UserId = ${id}`, 'User Repository');
     await this.blogUserModel.findByIdAndUpdate({ _id: id }, {$inc: {publicationCount: -1}, }, { new: true }).exec();
  }
}

