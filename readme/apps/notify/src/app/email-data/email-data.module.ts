import { Module } from '@nestjs/common';
// import { EmailSubscriberRepository } from './email-subscriber.repository';
// import { MongooseModule } from '@nestjs/mongoose';
// import { SubscriberModel, SubscriberSchema } from './email-subscriber.model';
import { MailModule } from '../mail/mail.module';
import { EmailDataController } from './email-data.controller';
import { EmailDataService } from './email-data.service';
import { PostNotifyModule } from '../email-post/email-post.module';
import { EmailSubscriberModule } from '../email-user/email-user.module';
import { EmailRESTController } from './email-rest.controller';

 @Module({
   imports: [ EmailSubscriberModule, MailModule, PostNotifyModule ],
   controllers: [
     EmailDataController, EmailRESTController
   ],
   providers: [
     EmailDataService,
   ],
 })
 export class EmailDataModule {}
