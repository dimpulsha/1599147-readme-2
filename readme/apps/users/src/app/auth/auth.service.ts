import * as dayjs from 'dayjs';
import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { BlogUserMemoryRepository } from '../blog-user/blog-user-memory.repository';
import { BlogUserEntity } from '../blog-user/blog-user.entity';
import { AUTH_USER_EXISTS, AUTH_LOGIN_WRONG, AUTH_NOT_FOUND, METHOD_NOT_IMPLEMENTED } from './auth-constant';
import { LoginUserDTO } from './dto/login-user.dto';
import { UpdatePasswordDTO } from './dto/update-pwd.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {

  constructor(
    private readonly blogUserMemoryRepository: BlogUserMemoryRepository,
    private readonly configService: ConfigService
  ) {

    console.log(this.configService.get<string>('database.host'));

  }

  async register(dto: CreateUserDTO) {
    const blogUser = {
      email: dto.email,
      firstName: dto.firstName,
      lastName: dto.lastName,
      avatarImg: dto.avatarImg ? dto.avatarImg : '',
      publicationCount: 0,
      friends: 0,
      registrationDate: dayjs().toDate(),
      passwordHash: ''
    }

    if (await this.blogUserMemoryRepository.getByEmail(blogUser.email)) {
      Logger.error(AUTH_USER_EXISTS);
      return (AUTH_USER_EXISTS);
    }

    const userEntity = await new BlogUserEntity(blogUser).setPassword(dto.password);

    return await this.blogUserMemoryRepository.create(userEntity);
  }


  async verifyUser(dto: LoginUserDTO) {

    const { email, password } = dto;
    const existUser = await this.blogUserMemoryRepository.getByEmail(email);
    if (!existUser) {
      Logger.error(AUTH_LOGIN_WRONG);
      return null;
    }

    const blogUserEntity = new BlogUserEntity(existUser);
    if (! await blogUserEntity.comparePassword(password)) {
      Logger.error(AUTH_LOGIN_WRONG);
      return null;
    }

    return blogUserEntity.toObject();

  }

  async getUser(id: string) {

    const existUser = await this.blogUserMemoryRepository.getById(id)
    if (!existUser) {
      Logger.error(AUTH_NOT_FOUND);
      return null;
    }

    return existUser;
  }

  async updatePWD(dto: UpdatePasswordDTO) {

      Logger.error(METHOD_NOT_IMPLEMENTED);
      return (`${METHOD_NOT_IMPLEMENTED} ${JSON.stringify(dto)} `);
  }

}
