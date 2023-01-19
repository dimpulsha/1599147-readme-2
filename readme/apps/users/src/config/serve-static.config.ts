import { ConfigService } from '@nestjs/config';
import { ServeStaticModuleOptions } from '@nestjs/serve-static';
import { join } from 'path';
import { STATIC_ROOT_PATH } from '../app/app.constant';

export function getServeStaticOptions(
  configService: ConfigService
): ServeStaticModuleOptions[] {

  const uploadFolder = configService.get<string>('uploadUser.uploadDir');

  return [
    {
      rootPath: join(__dirname, uploadFolder),
      serveRoot: `/${STATIC_ROOT_PATH}`,
      exclude: ['/api*'],
      serveStaticOptions: {
        index: false
      }
    },
  ];
}
