import { ConfigService, registerAs}  from '@nestjs/config';
import { RmqOptions, Transport } from '@nestjs/microservices';

 export const rabbitMqOptions = registerAs('rmq', () => ({
   user: process.env.RMQ_USER,
   password: process.env.RMQ_PASSWORD,
   host: process.env.RMQ_HOST,
   queue: process.env.RMQ_NOTIFY_SERVICE_QUEUE,
 }));

  export const rabbitMqStatOptions = registerAs('rmqStat', () => ({
  user: process.env.RMQ_STAT_USER,
  password: process.env.RMQ_STAT_PASSWORD,
  host: process.env.RMQ_STAT_HOST,
  statQueue: process.env.RMQ_STAT_QUEUE,
 }));

  export function getRabbitMqConfig(configService: ConfigService): RmqOptions {
   const user = configService.get<string>('rmq.user');
   const password = configService.get<string>('rmq.password');
   const host = configService.get<string>('rmq.host');
   const queue = configService.get<string>('rmq.queue');
   const url = `amqp://${user}:${password}@${host}`;

   return {
     transport: Transport.RMQ,
     options: {
       urls: [url],
       queue,
       persistent: true,
       noAck: true,
       queueOptions: {
         durable: true,
       }
     }
   }
  }

 export function getRabbitMqStatConfig(configService: ConfigService): RmqOptions {
   const user = configService.get<string>('rmqStat.user');
   const password = configService.get<string>('rmqStat.password');
   const host = configService.get<string>('rmqStat.host');
   const queue = configService.get<string>('rmqStat.statQueue');
   const url = `amqp://${user}:${password}@${host}`;

   return {
     transport: Transport.RMQ,
     options: {
       urls: [url],
       queue,
       persistent: true,
       noAck: true,
       queueOptions: {
         durable: true,
       }
     }
   }
 }
