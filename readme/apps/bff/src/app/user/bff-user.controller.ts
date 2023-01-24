import { Body, Controller, Get, Headers, HttpCode, HttpStatus, Logger, Param, Post,} from "@nestjs/common";
import { BffUserService } from "./bff-user.service";
import { CreateUserDTO } from "./dto/create-user.dto";
import { LoginUserDTO } from "./dto/login-user.dto";

@Controller('user')
export class BffUserController {
  private readonly logger = new Logger(BffUserController.name);

  constructor ( private readonly bffUserService: BffUserService) {}

  @Post('register')
  public async registerUser(@Body() body: CreateUserDTO) {

    this.logger.log(`BFF register request email: ${body.email}`)
     return await this.bffUserService.registerUser(body);

  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async loginUser(@Body() body: LoginUserDTO) {

    this.logger.log(`BFF login request email: ${body.email}`)
     return await this.bffUserService.login(body);

  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  public async getUser(@Param('id') id: string, @Headers('Authorization') token: string) {
    
    this.logger.log(`accept Get request auth/:id ${id}`);
    return await this.bffUserService.getUser(id, token);
  }

}
