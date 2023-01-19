import { Module } from '@nestjs/common';
// import { BlogUserDBRepository } from '../blog-user/blog-user-db-repository';
import { BlogUserModule } from '../blog-user/blog-user.module';
import { UserStatController } from './user-stat.controller';
import { UserStatService } from './user-stat.service';


@Module({
  imports: [BlogUserModule],
  controllers: [UserStatController],
  providers: [UserStatService],
})
export class UserStatModule {}
