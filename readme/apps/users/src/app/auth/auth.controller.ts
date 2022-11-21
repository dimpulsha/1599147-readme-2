import { Body, Controller, Get, HttpCode, HttpStatus, Logger, Param, Patch, Post } from '@nestjs/common';
import { fillObject } from '@readme/core';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { LoginUserDTO } from './dto/login-user.dto';
import { LoggedUserRDO } from './rdo/logged-user.rdo';
import { UserInfoRDO } from './rdo/user-info.rdo';
import { AUTH_LOGIN_WRONG, METHOD_NOT_IMPLEMENTED } from './auth-constant';


@ApiTags('auth')
@Controller('auth')
export class AuthController {

  constructor ( private readonly authService: AuthService) {}

  @Post('register')
  @ApiResponse({
    type: UserInfoRDO,
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created.'
  })
  public async create(@Body() dto: CreateUserDTO) {
    Logger.log('accept request auth/register');
    const newUser = this.authService.register(dto);
    return fillObject(UserInfoRDO, newUser);

}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: LoginUserDTO,
    status: HttpStatus.OK,
    description: 'The user has been successfully logged.'
  })
  public async login(@Body() dto: LoginUserDTO) {
    Logger.log('accept request auth/login');
    const result = this.authService.verifyUser(dto);
    if (!result) {
      return AUTH_LOGIN_WRONG;
    }

    return fillObject(LoggedUserRDO, result )

  }

  @Get(':id')
  @ApiResponse({
    type: UserInfoRDO,
    status: HttpStatus.OK,
    description: 'The user found.'
  })
  public async getUser(@Param('id') id: string) {
    Logger.log('accept Get request auth/:id');
    const result = this.authService.getUser(id);
    return fillObject(UserInfoRDO, result);

  }

  @Post(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The new user is valid'
  })
  public async checkUser(@Param('id') id: string) {
    console.log(id);
    Logger.log('accept Post request auth/:id');
    return (METHOD_NOT_IMPLEMENTED);

  }

  @Patch('update/:id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User password updated'
  })
  public async update(@Param('id') id: string) {
    console.log(id);

    Logger.log('accept update auth/update/:id');
    return (METHOD_NOT_IMPLEMENTED);
  }

}
