import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SubscriberModel, SubscriberSchema } from './email-subscriber.model';
import { EmailSubscriberRepository } from './email-subscriber.repository';

@Module({
  imports: [MongooseModule.forFeature([
       { name: SubscriberModel.name, schema: SubscriberSchema }
     ]),],
  providers: [EmailSubscriberRepository],
  exports: [EmailSubscriberRepository]
})
export class EmailSubscriberModule {}
