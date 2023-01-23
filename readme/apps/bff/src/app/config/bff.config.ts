import { ConfigService, registerAs } from "@nestjs/config";
import { ServiceUrlConfig } from '@readme/shared';

export const bffConfig = registerAs('bff', () => ({
  serviceHost: process.env.HOST,
  servicePort: process.env.PORT,
  userHost: process.env.USER_HOST,
  userPort: process.env.USER_PORT,
  blogHost: process.env.BLOG_HOST,
  blogPort: process.env.BLOG_PORT,
  notifyHost: process.env.NOTIFY_HOST,
  notifyPort: process.env.NOTIFY_PORT,
}));

export function getUserConfig(configService: ConfigService): ServiceUrlConfig {
 const bffUserConfig =  {
    host: configService.get<string>('bff.userHost'),
    port: configService.get<number>('bff.userPort'),
 }
  return bffUserConfig;
}

export function getBlogConfig(configService: ConfigService): ServiceUrlConfig {
  return ({
    host: configService.get<string>('bff.blogHost'),
    port: configService.get<number>('bff.blogPort'),
  })
}

export function getNotifyConfig(configService: ConfigService): ServiceUrlConfig {
  return {
    host: configService.get<string>('bff.notifyHost'),
    port: configService.get<number>('bff.notifyPort'),
  }
}
