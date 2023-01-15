import { ConfigService } from '@nestjs/config';
import { diskStorage } from 'multer';
import { nanoid } from 'nanoid';
import { join } from 'path';
import * as mime from 'mime-types';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

export function getMulterOptions(configService: ConfigService): MulterOptions {
  const uploadFolder = configService.get<string>('upload.uploadDir');
  return {
    storage: diskStorage({
      destination: join(__dirname, uploadFolder), 
      filename: (_req, file, callback) => {
        const extension = mime.extension(file.mimetype) ?? '';
        const filename = nanoid();
        callback(null, `${filename}.${extension}`);
      },
    }),
  };
}
