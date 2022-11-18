import { Body, Controller, Get, HttpCode, HttpStatus, Logger, Patch, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {

  constructor ( private readonly authService: AuthService) {}

  @Post('register')
  public async create(@Body() dto: CreateUserDTO) {
    Logger.log('accept request auth/register');
    return this.authService.register(dto);

}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login() {
    Logger.log('accept request auth/login');
    return ({ "message": "login request accepted" });

  }

  @Get(':id')
  public async getUser() {
    Logger.log('accept Get request auth/:id');
    return ({ "message": "info request accepted" });

  }

  @Post(':id')
  @HttpCode(HttpStatus.OK)
  public async checkUser() {
    Logger.log('accept Post request auth/:id');
    return ({ "message": "check request accepted" });

  }

  @Patch('update/:id')
  @HttpCode(HttpStatus.OK)
  public async update() {
    Logger.log('accept update auth/update/:id');
    return ({ "message": "update request accepted" });

  }

}
