import { Body, Controller, FileTypeValidator, Get, HttpCode, HttpStatus, Logger, MaxFileSizeValidator, Param, ParseFilePipe, Patch, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { fillObject, GetUser } from '@readme/core';
import { ApiTags, ApiResponse, ApiOperation, ApiCreatedResponse, ApiHeader, ApiBadRequestResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { LoginUserDTO } from './dto/login-user.dto';
import { UserInfoRDO } from './rdo/user-info.rdo';
import { IMAGE_FILE_TYPE, MAX_PHOTO_SIZE} from './constants/auth-constant';
import { MongoIdValidationPipe } from '../pipes/mongo-validation.pipe';
import { JwtAuthGuard } from './guards/jwt.guard';
import { UpdatePasswordDTO } from './dto/update-pwd.dto';
import { UserActionQuery } from './query/users-action.query';
import { FileInterceptor } from '@nestjs/platform-express';
import { STATIC_ROOT_PATH } from '../app.constant';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

  private readonly logger = new Logger(AuthController.name);

  constructor ( private readonly authService: AuthService) {}

  @Post('register')
  @ApiResponse({
    type: UserInfoRDO,
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created.'
  })
  public async create(@Body() dto: CreateUserDTO) {
    this.logger.log('accept request auth/register');
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
    this.logger.log('accept request auth/login');
    const user = await this.authService.verifyUser(dto);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiResponse({
    type: UserInfoRDO,
    status: HttpStatus.OK,
    description: 'Get user information'
  })
  public async getUser(@Param('id', MongoIdValidationPipe) id: string) {
    this.logger.log('accept Get request auth/:id');
    const result = this.authService.getUser(id);
    return fillObject(UserInfoRDO, result);
  }

  @UseGuards(JwtAuthGuard)
  @Post('check')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The user is valid'
  })
  public async checkUser(@GetUser('id') id: string) {
    this.logger.log(`Accept user check request`);
    const result = this.authService.getUser(id);
    return fillObject(UserInfoRDO, result);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update/:id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User password updated'
  })
  public async update(@Param('id', MongoIdValidationPipe) id: string, @Body() dto: UpdatePasswordDTO) {

    this.logger.log(`accept update auth/update/ ${id}`);
    const result = await this.authService.updatePWD(id, dto);
    return fillObject(UserInfoRDO, result);
  }

  // @Patch('updatePostsStat/:id')
  // @HttpCode(HttpStatus.OK)
  // @ApiResponse({
  //   status: HttpStatus.OK,
  //   description: 'Update post counter'
  // })
  // public async updatePostStats(@Param('id', MongoIdValidationPipe) id: string, @Query() query: UserActionQuery) {
  //   Logger.log(`accept update auth/update/ ${id}`, `${AuthController.name}`);
  //   const result = await this.authService.updatePostStats(id, query);
  //   return result;
  // }

  @Patch('updateFriends/:id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Update post counter'
  })
  public async updateFriends(@Param('id', MongoIdValidationPipe) id: string, @Query() query: UserActionQuery) {
    this.logger.log(`accept update auth/update/ ${id}`);
    const result = await this.authService.updateFriends(id, query);
    return result;
  }

  @Post('upload/:id')
  @ApiOperation({ summary: 'Upload post image' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: 'The file is uploaded',
    type: UserInfoRDO,
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
  })
  @ApiUnauthorizedResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  // @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFile(
    @Param('id') id: string,
    @UploadedFile(
      new ParseFilePipe(
        {
      validators: [
        new MaxFileSizeValidator({ maxSize: MAX_PHOTO_SIZE }),
        new FileTypeValidator({ fileType: IMAGE_FILE_TYPE }),
      ],
        })
    )
    file: Express.Multer.File,
  )
  {
    const fileUrl = `http://localhost:3333/${STATIC_ROOT_PATH}/${file.filename}`;
    const result = await this.authService.updateImg(id, fileUrl)

    return fillObject(UserInfoRDO, result);
      }

}
