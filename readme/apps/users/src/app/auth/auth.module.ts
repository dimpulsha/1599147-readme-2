import { Module } from '@nestjs/common';
import { BlogUserModule } from '../blog-user/blog-user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJwtConfig } from '../../config/jwt.config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ClientsModule } from '@nestjs/microservices';
import { getRabbitMqConfig } from '../../config/rabbit.mq.config';
import { RABBITMQ_USER_SERVICE } from './constants/auth-constant';
import { MulterModule } from '@nestjs/platform-express';
import { getMulterOptions } from '../../config/multer.config';

@Module({
imports: [
    BlogUserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig
    }),
    ClientsModule.registerAsync([
    {
      name: RABBITMQ_USER_SERVICE,
      useFactory: getRabbitMqConfig,
      inject: [ConfigService]
    }
    ]),
    MulterModule.registerAsync({
      useFactory: getMulterOptions,
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
