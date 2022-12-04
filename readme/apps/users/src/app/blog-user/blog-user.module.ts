import { Module } from '@nestjs/common';
import { BlogUserDBRepository } from './blog-user-db-repository';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogUserModel, BlogUserSchema } from './blog-user.model';

@Module({
  imports: [MongooseModule.forFeature([
     { name: BlogUserModel.name, schema: BlogUserSchema }
   ])],
  providers: [BlogUserDBRepository],
  exports: [BlogUserDBRepository]
})
export class BlogUserModule {}
