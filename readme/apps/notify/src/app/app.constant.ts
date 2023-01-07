export const ENV_FILE_PATH = 'environments/.notify.env';

export enum MongoConfigValidationMessage {
   DBHostRequired = 'MongoDB host is required',
   DBNameRequired = 'Database name is required',
   DBPortRequired = 'MongoDB port is required',
   DBUserRequired = 'MongoDB user is required',
   DBPasswordRequired = 'MongoDB password is required',
   DBBaseAuthRequired = 'MongoDB authentication base is required',
}

export enum RabbitConfigValidationMessage {
  RMQUserRequired = 'Rabbit MQ user required',
  RMQPasswordRequired = 'Rabbit MQ user password required',
  RMQHostRequired = 'Rabbit MQ host required',
  RMQServiceQueueRequired = 'Rabbit MQ service queue required',
}

export enum MailConfigValidationMessage {
  SMTPHostRequired = 'SMTP Server is required',
  SMTPUserRequired = 'SMTP Server user name is required',
  SMTPPasswordRequired = 'SMTP Server password is required',
  MailFromFromRequired = 'Default value for mail from field is required',
  SMTPPortRequired = 'SMTP Server port is required',
}

export const MIN_PORT = 1025;
export const MAX_PORT = 65535;
