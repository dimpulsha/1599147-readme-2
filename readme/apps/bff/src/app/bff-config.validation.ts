import { IsNumber, IsString, validateSync } from 'class-validator';
import { BffConfigViolation } from './constants/bff.constants';
import { plainToInstance } from 'class-transformer';

export class BffConfig {

  @IsString({
    message: BffConfigViolation.BffHostRequired
  })
  public HOST: string;

  @IsNumber({}, {
    message: BffConfigViolation.BffPortRequired
  })
  public PORT: number;

  @IsString({
    message: BffConfigViolation.BffUserHostRequired
  })
  public USER_HOST: string;

  @IsNumber({}, {
    message: BffConfigViolation.BffUserPortRequired
  })
  public USER_PORT: number;

  @IsString({
    message: BffConfigViolation.BffBlogHostRequired
  })
  public BLOG_HOST: string;

  @IsNumber({}, {
    message: BffConfigViolation.BffBlogPortRequired
  })
  public BLOG_PORT: number;

  @IsString({
    message: BffConfigViolation.BffNotifyHostRequired
  })
  public NOTIFY_HOST: string;

  @IsNumber({}, {
    message: BffConfigViolation.BffNotifyPortRequired
  })
  public NOTIFY_PORT: number;
}

export function validateEnvironments(config: Record<string, unknown>) {
  const userConfigItem = plainToInstance(BffConfig, config, {
    enableImplicitConversion: true,
  });

  console.log( userConfigItem );

  const validationErrors = validateSync(userConfigItem, {
    skipMissingProperties: false
  })

  if (validationErrors.length > 0) {
      throw new Error (validationErrors.toString())
  }

  return userConfigItem;

}
