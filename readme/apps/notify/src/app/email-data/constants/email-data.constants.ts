export enum SubscriberValidation {
  MinUserName = 3,
  MaxUserName = 50,
}

export const AUTH_USER_EMAIL_NOT_VALID = 'Email is not valid';
export const USER_LENGTH_VIOLATION = `Invalid User Name length: min ${SubscriberValidation.MinUserName} - max ${SubscriberValidation.MaxUserName}`;
export const SUBSCRIBER_EXIST = 'Email is exist';
export const EMAIL_EMPTY_VIOLATION = 'Email is empty';
export const USER_ID_EMPTY_VIOLATION = 'User ID is empty';
export const USER_ID_NO_MONGO_VIOLATION = 'User ID is no MongoDB ID';
export const USER_NAME_EMPTY_VIOLATION = 'Username is empty';

export const URL_EMPTY_VIOLATION = 'Post url is empty';
export const POST_ID_EMPTY_VIOLATION = 'Post ID is empty'
export const POST_NOTIFY_ERROR = 'Error add post to notification list';

export const INVALID_EMAIL_COMMAND = 'Invalid email command';
