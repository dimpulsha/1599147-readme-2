export enum RabbitConfigValidationMessage {
  RMQUserRequired = 'Rabbit MQ user required',
  RMQPasswordRequired = 'Rabbit MQ user password required',
  RMQHostRequired = 'Rabbit MQ host required',
  RMQServiceQueueRequired = 'Rabbit MQ service queue required'
}

export const RABBITMQ_USER_SERVICE = Symbol('RABBITMQ_USER_SERVICE');

export const MAX_PHOTO_SIZE = 1024 * 1024;
export const IMAGE_FILE_TYPE = /image\/(jpeg|png)$/;
export const DEFAULT_AVATAR = 'default.img'
