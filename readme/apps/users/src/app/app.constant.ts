export const ENV_FILE_PATH = 'environments/.users.env';

export enum MongoConfigValidationMessage {
   DBHostRequired = 'MongoDB host is required',
   DBNameRequired = 'Database name is required',
   DBPortRequired = 'MongoDB port is required',
   DBUserRequired = 'MongoDB user is required',
   DBPasswordRequired = 'MongoDB password is required',
   DBBaseAuthRequired = 'MongoDB authentication base is required',
 }

export const MIN_PORT = 1025;
export const MAX_PORT = 65535;

export const STATIC_ROOT_PATH = 'img'
