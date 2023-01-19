import { Injectable, Logger } from "@nestjs/common";
import { BlogUserDBRepository } from "../blog-user/blog-user-db-repository";

@Injectable()
export class UserStatService {

  constructor(
    private readonly userRepository: BlogUserDBRepository
  ) {}

  public async incPostStat(userId: string): Promise<void> {
    Logger.log(`Increment post count. UserId = ${userId}`, 'User-Stat Module');
    await this.userRepository.incPostStat(userId);
  }

  public async decPostStat(userId: string): Promise<void> {
    Logger.log(`Decrement post count. UserId = ${userId}`, 'User-Stat Module');
    await this.userRepository.decPostStat(userId);
  }

}
