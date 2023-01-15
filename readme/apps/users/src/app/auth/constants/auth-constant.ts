export const AUTH_USER_EXISTS = 'User with this email exists';
export const AUTH_LOGIN_WRONG = 'User login or password is wrong';
export const AUTH_NOT_FOUND = 'User not found. Welcome to register the user';
export const METHOD_NOT_IMPLEMENTED = 'Method not implemented';
export const AUTH_USER_EMAIL_NOT_VALID = 'Email is not valid';

export enum UserValidation {
  MinUserName = 3,
  MaxUserName = 50,
  MinUserPassword = 6,
  MaxUserPassword = 12
}

export const USER_LENGTH_VIOLATION = `Invalid User Name length: min ${UserValidation.MinUserName} - max ${UserValidation.MaxUserName}`;
export const PASSWORD_LENGTH_VIOLATION = `Invalid password length: min ${UserValidation.MinUserPassword} - max ${UserValidation.MaxUserPassword}`;

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
