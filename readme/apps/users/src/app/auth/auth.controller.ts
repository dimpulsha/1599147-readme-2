import { Body, Controller, HttpCode, HttpStatus, Logger, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {

  constructor ( private readonly authService: AuthService) {}

  @Post('register')
  public async create(@Body() dto: CreateUserDTO) {
    Logger.log('accept request auth/register');
    return this.authService.register(dto);

    // return ({ "message": "resister request accepted" });

}

  @Post('')
  @HttpCode(HttpStatus.OK)
  public async login() {
    Logger.log('accept login auth/');
    return ({ "message": "login request accepted" });


  }

}
