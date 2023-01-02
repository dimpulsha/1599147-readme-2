import * as dayjs from 'dayjs';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { BlogUserDBRepository } from '../blog-user/blog-user-db-repository';
import { BlogUserEntity } from '../blog-user/blog-user.entity';
import { AUTH_USER_EXISTS, AUTH_LOGIN_WRONG, AUTH_NOT_FOUND, METHOD_NOT_IMPLEMENTED } from './constants/auth-constant';
import { LoginUserDTO } from './dto/login-user.dto';
import { UpdatePasswordDTO } from './dto/update-pwd.dto';
import { ConfigService } from '@nestjs/config';
import { UserInterface } from '@readme/shared';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    private readonly blogUserRepository: BlogUserDBRepository,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) {

    console.log(this.configService.get<string>('database.port'));

  }

  async register(dto: CreateUserDTO) {
    const blogUser = {
      email: dto.email,
      userName: dto.userName,
      avatarImg: dto.avatarImg ? dto.avatarImg : '',
      publicationCount: 0,
      friends: 0,
      registrationDate: dayjs().toDate(),
      passwordHash: ''
    }

    if (await this.blogUserRepository.getByEmail(blogUser.email)) {
      Logger.error(AUTH_USER_EXISTS);
      throw new UnauthorizedException(AUTH_USER_EXISTS);
    }

    const userEntity = await new BlogUserEntity(blogUser).setPassword(dto.password);
    return await this.blogUserRepository.create(userEntity);
  }


  async verifyUser(dto: LoginUserDTO) {

    const { email, password } = dto;
    const existUser = await this.blogUserRepository.getByEmail(email);

    if (!existUser) {
      Logger.error(AUTH_LOGIN_WRONG);
      throw new UnauthorizedException(AUTH_LOGIN_WRONG);
    }

    const blogUserEntity = new BlogUserEntity(existUser);
    if (! await blogUserEntity.comparePassword(password)) {
      Logger.error(AUTH_LOGIN_WRONG);
      throw new UnauthorizedException(AUTH_LOGIN_WRONG);
    }

    return blogUserEntity.toObject();

  }

  async getUser(id: string) {

    const existUser = await this.blogUserRepository.getById(id)
    if (!existUser) {
      Logger.error(AUTH_NOT_FOUND);
      throw new UnauthorizedException(AUTH_NOT_FOUND);
    }

    return existUser;
  }

  async updatePWD(dto: UpdatePasswordDTO) {
      Logger.error(METHOD_NOT_IMPLEMENTED);
      return (`${METHOD_NOT_IMPLEMENTED} ${JSON.stringify(dto)} `);
  }

  public async loginUser(user: UserInterface) {
    const payload = {
      sub: user._id,
      email: user.email,
      name: user.userName
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

}
