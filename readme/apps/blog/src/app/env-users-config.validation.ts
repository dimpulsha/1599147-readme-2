import { plainToInstance } from 'class-transformer';
import { IsString, validateSync } from 'class-validator';
import { RabbitConfigValidationMessage } from './app.constant';

export class BlogConfig {

  @IsString({
    message: RabbitConfigValidationMessage.RMQUserRequired
  })
  public RMQ_USER: string;

  @IsString({
    message: RabbitConfigValidationMessage.RMQPasswordRequired
  })
  public RMQ_PASSWORD: string;

  @IsString({
    message: RabbitConfigValidationMessage.RMQHostRequired
  })
  public RMQ_HOST: string;

  @IsString({
    message: RabbitConfigValidationMessage.RMQServiceQueueRequired
  })
  public RMQ_NOTIFY_SERVICE_QUEUE: string;

}

export function validateEnvironments(config: Record<string, unknown>) {
  const blogConfigItem = plainToInstance(BlogConfig, config, {
    enableImplicitConversion: true,
  });

  const validationErrors = validateSync(blogConfigItem, {
    skipMissingProperties: false
  })

  if (validationErrors.length > 0) {
    console.log(validationErrors);

      throw new Error (validationErrors.toString())
  }

  return blogConfigItem;

}

