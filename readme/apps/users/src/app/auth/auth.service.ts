import * as dayjs from 'dayjs';
import { Inject, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { BlogUserDBRepository } from '../blog-user/blog-user-db-repository';
import { BlogUserEntity } from '../blog-user/blog-user.entity';
import { AUTH_USER_EXISTS, AUTH_LOGIN_WRONG, AUTH_NOT_FOUND, RABBITMQ_USER_SERVICE, DEFAULT_AVATAR} from './constants/auth-constant';
import { LoginUserDTO } from './dto/login-user.dto';
import { UpdatePasswordDTO } from './dto/update-pwd.dto';
import { NotifyCommandEnum, UserActionEnum, UserInterface } from '@readme/shared';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { UserActionQuery } from './query/users-action.query';

@Injectable()
export class AuthService {

  constructor(
    private readonly blogUserRepository: BlogUserDBRepository,
    private readonly jwtService: JwtService,
    @Inject(RABBITMQ_USER_SERVICE) private readonly rabbitClient: ClientProxy
  ) { }

  public async register(dto: CreateUserDTO): Promise<UserInterface> {
    const blogUser = {
      email: dto.email,
      userName: dto.userName,
      avatarImg: dto.avatarImg ? dto.avatarImg : DEFAULT_AVATAR,
      publicationCount: 0,
      friendsCount: 0,
      registrationDate: dayjs().toDate(),
      passwordHash: '',

    }

    if (await this.blogUserRepository.getByEmail(blogUser.email)) {
      Logger.error(AUTH_USER_EXISTS);
      throw new UnauthorizedException(AUTH_USER_EXISTS);
    }

    const userEntity = await new BlogUserEntity(blogUser).setPassword(dto.password);
    const result = await this.blogUserRepository.create(userEntity);

    this.rabbitClient.emit(
    { cmd: NotifyCommandEnum.AddSubscriber },
      {
      id: result._id.toString(),
      email: result.email,
      userName: result.userName,
    }
    );

    return result;
  }

  public async verifyUser(dto: LoginUserDTO) {

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

    return this.loginUser(blogUserEntity.toObject());

  }

  public async getUser(id: string) {

    const existUser = await this.blogUserRepository.getById(id)
    if (!existUser) {
      Logger.error(AUTH_NOT_FOUND);
      throw new UnauthorizedException(AUTH_NOT_FOUND);
    }

    return existUser;
  }

  async updatePWD(id: string, dto: UpdatePasswordDTO): Promise<UserInterface> {
    const existUser = await this.getUser(id)
    const blogUserEntity = new BlogUserEntity(existUser);

    if (! await blogUserEntity.comparePassword(dto.oldPassword)) {
      Logger.error(AUTH_LOGIN_WRONG);
      throw new UnauthorizedException(AUTH_LOGIN_WRONG);
    }

    await blogUserEntity.setPassword(dto.newPassword);
    const result = await this.blogUserRepository.update(id, blogUserEntity);

    return result
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

  public async updatePostStats(id: string, query: UserActionQuery): Promise<UserInterface> {
    const existUser = await this.getUser(id);

    switch (query.act) {
      case UserActionEnum.PostInc:
        existUser.publicationCount = ++existUser.publicationCount;
        break;
      case UserActionEnum.PostDec:
        existUser.publicationCount = --existUser.publicationCount;
        break
      default: break
    }

    if (existUser.publicationCount < 0) { existUser.publicationCount = 0 }

    return await this.blogUserRepository.update(id, new BlogUserEntity(existUser));
  }

  public async updateFriends(id: string, query:UserActionQuery): Promise<UserInterface> {

    let result: UserInterface;
      switch (query.act) {
        case UserActionEnum.AddToFriends:
          result = await this.blogUserRepository.addFriend(id, query.friendId);
          return result
        case UserActionEnum.RemoveFriend:
          result = await this.blogUserRepository.removeFriend(id, query.friendId);
          return result

        default: break;
    }
  }

  public async updateImg(id: string, fileUrl: string): Promise<UserInterface> {
    return await this.blogUserRepository.updateImg(id, fileUrl);
  }

}
