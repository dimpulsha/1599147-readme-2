import { plainToInstance } from 'class-transformer';
import { IsString, IsNumber, Max, Min, validateSync } from 'class-validator';
import { MongoConfigValidationMessage, MIN_PORT, MAX_PORT, RabbitConfigValidationMessage, MailConfigValidationMessage } from './app.constant';

export class NotifyServiceConfig {

  @IsString({
      message: MongoConfigValidationMessage.DBNameRequired
    })
  public NOTIFY_MONGO_DB :string;

  @IsString({
    message: MongoConfigValidationMessage.DBHostRequired
  })
  public NOTIFY_MONGO_HOST: string;

  @IsNumber({}, {
    message: MongoConfigValidationMessage.DBPortRequired
  })
  @Min(MIN_PORT, {
    message: `Min port value is ${MIN_PORT}`
  })
  @Max(MAX_PORT, {
    message: `Max port value is ${MAX_PORT}`
  })
  public NOTIFY_MONGO_PORT: number;

  @IsString({
    message: MongoConfigValidationMessage.DBUserRequired
  })
  public NOTIFY_MONGO_USER: string;

  @IsString({
    message: MongoConfigValidationMessage.DBPasswordRequired
  })
  public NOTIFY_MONGO_PASSWORD: string;

  @IsString({
    message: MongoConfigValidationMessage.DBBaseAuthRequired
  })
  public NOTIFY_MONGO_AUTH_BASE: string;

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

   @IsString({
     message: MailConfigValidationMessage.SMTPHostRequired
   })
   public MAIL_SMTP_HOST: string;

   @IsNumber({}, {
     message: MailConfigValidationMessage.SMTPPortRequired
   })
  @Min(MIN_PORT, {
    message: `Min port value is ${MIN_PORT}`
  })
  @Max(MAX_PORT, {
    message: `Max port value is ${MAX_PORT}`
  })
   public MAIL_SMTP_PORT: number;

   @IsString({
     message: MailConfigValidationMessage.SMTPUserRequired
   })
   public MAIL_USER_NAME: string;

   @IsString({
     message: MailConfigValidationMessage.SMTPPasswordRequired
   })
   public MAIL_USER_PASSWORD: string;

   @IsString({
     message: MailConfigValidationMessage.MailFromFromRequired
   })
   public MAIL_FROM: string;

}

export function validateEnvironments(config: Record<string, unknown>) {
  const configItem = plainToInstance(NotifyServiceConfig, config, {
    enableImplicitConversion: true,
  });

  const validationErrors = validateSync(configItem, {
    skipMissingProperties: false
  })

  if (validationErrors.length > 0) {
      throw new Error (validationErrors.toString())
  }

  return configItem;

}

