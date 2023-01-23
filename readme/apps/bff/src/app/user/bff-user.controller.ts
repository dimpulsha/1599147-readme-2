import { Body, Controller, Logger, Post,} from "@nestjs/common";
import { BffUserService } from "./bff-user.service";

@Controller('user')
export class BffUserController {

    constructor ( private readonly bffUserService: BffUserService) {}

  @Post('register')

  public async registerUser(@Body() req: Request) {
    Logger.log('bff register')

      const result = await this.bffUserService.registerUser(req);
      console.log(result);

      return result;

  }

}
