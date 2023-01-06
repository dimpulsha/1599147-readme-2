import { ConfigService, registerAs}  from '@nestjs/config';
import { RmqOptions, Transport } from '@nestjs/microservices';

 export const rabbitMqOptions = registerAs('rmq', () => ({
   user: process.env.RMQ_USER,
   password: process.env.RMQ_PASSWORD,
   host: process.env.RMQ_HOST,
   queue: process.env.RMQ_NOTIFY_SERVICE_QUEUE,
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
