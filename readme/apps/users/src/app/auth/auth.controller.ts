import { Body, Controller, Get, HttpCode, HttpStatus, Logger, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { fillObject } from '@readme/core';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { LoginUserDTO } from './dto/login-user.dto';
// import { LoggedUserRDO } from './rdo/logged-user.rdo';
import { UserInfoRDO } from './rdo/user-info.rdo';
import { METHOD_NOT_IMPLEMENTED } from './constants/auth-constant';
import { MongoIdValidationPipe } from '../pipes/mongo-validation.pipe';
import { JwtAuthGuard } from './guards/jwt.guard';
import { UpdatePasswordDTO } from './dto/update-pwd.dto';


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
    const user = await this.authService.verifyUser(dto);
    return this.authService.loginUser(user);

  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiResponse({
    type: UserInfoRDO,
    status: HttpStatus.OK,
    description: 'The user found.'
  })
  public async getUser(@Param('id', MongoIdValidationPipe) id: string) {
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
  public async checkUser(@Param('id', MongoIdValidationPipe) id: string) {
    console.log(id);
    Logger.log('accept Post request auth/:id');
    return (METHOD_NOT_IMPLEMENTED);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update/:id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User password updated'
  })
  public async update(@Param('id', MongoIdValidationPipe) id: string, @Body() dto: UpdatePasswordDTO) {

    Logger.log(`accept update auth/update/ ${id}`);
    const result = await this.authService.updatePWD(id, dto);
    return fillObject(UserInfoRDO, result);
  }

}
