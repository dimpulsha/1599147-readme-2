import * as dayjs from 'dayjs';
import { Injectable } from '@nestjs/common';
// import { UserInterface } from '@readme/shared';
import { CreateUserDTO } from './dto/create-user.dto';
import { BlogUserMemoryRepository } from '../blog-user/blog-user-memory.repository';
import { BlogUserEntity } from '../blog-user/blog-user.entity';

@Injectable()
export class AuthService {

  constructor(
    private readonly blogUserMemoryRepository: BlogUserMemoryRepository
  ) { }

  async register(dto: CreateUserDTO) {
    // const { email, firstName, lastName, avatarImg, password } = dto
    const blogUser = {
      _id: '',
      email: dto.email,
      firstName: dto.firstName,
      lastName: dto.lastName,
      avatarImg: dto.avatarImg ? dto.avatarImg : '',
      publicationCount: 0,
      friends: 0,
      registrationDate: dayjs().toDate(),
      passwordHash: ''
    }
    const existUser = await this.blogUserMemoryRepository.getByEmail(blogUser.email);

    if (existUser) {
      throw new Error('User is already exist');
    }

    const userEntity = await new BlogUserEntity(blogUser).setPassword(dto.password);

    return await this.blogUserMemoryRepository.create(userEntity);

  }


  // async verifyUser() {

  // }
}
