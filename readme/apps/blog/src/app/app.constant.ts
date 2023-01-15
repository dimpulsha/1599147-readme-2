export enum RabbitConfigValidationMessage {
  RMQUserRequired = 'Rabbit MQ user required',
  RMQPasswordRequired = 'Rabbit MQ user password required',
  RMQHostRequired = 'Rabbit MQ host required',
  RMQServiceQueueRequired = 'Rabbit MQ service queue required'
}

export const ENV_FILE_PATH = 'environments/.blog.env';

export const STATIC_ROOT_PATH = 'storage';
