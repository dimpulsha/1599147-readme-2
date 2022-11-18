import * as dayjs from 'dayjs';
import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { BlogUserMemoryRepository } from '../blog-user/blog-user-memory.repository';
import { BlogUserEntity } from '../blog-user/blog-user.entity';
import { AUTH_USER_EXISTS } from './auth-constant';

@Injectable()
export class AuthService {

  constructor(
    private readonly blogUserMemoryRepository: BlogUserMemoryRepository
  ) { }

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


  // async verifyUser() {

  // }
}
