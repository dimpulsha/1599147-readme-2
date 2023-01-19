import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { UserStatCommandEnum } from "@readme/shared";
import { UserStatDTO } from "./dto/user-stat.dto";
import { UserStatService } from "./user-stat.service";

 @Controller()
 export class UserStatController {
   constructor(
     private readonly statService: UserStatService,
   ) {}

  @EventPattern({ cmd: UserStatCommandEnum.AddPostStat})
  public async incPostStat(user: UserStatDTO) {
    return this.statService.incPostStat(user.userId);
  }

  @EventPattern({ cmd: UserStatCommandEnum.DeletePostStat})
  public async decPostStat(user: UserStatDTO) {
    return this.statService.decPostStat(user.userId);
  }

}
