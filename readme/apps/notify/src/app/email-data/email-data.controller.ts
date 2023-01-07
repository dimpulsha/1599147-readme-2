import { EmailDataService } from './email-data.service';
import { EventPattern } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { NotifyCommandEnum } from '@readme/shared';
import { SubscriberDTO } from './dto/subscriber.dto';
import { PostNotifyDTO } from './dto/new-post.dto';

 @Controller()
 export class EmailDataController {
   constructor(
     private readonly emailService: EmailDataService,
   ) {}

  @EventPattern({ cmd: NotifyCommandEnum.AddSubscriber})
  public async create(subscriber: SubscriberDTO) {
    return this.emailService.addSubscriber(subscriber);
  }

  @EventPattern({ cmd: NotifyCommandEnum.DeleteSubscriber})
  public async delete(subscriber: SubscriberDTO) {
    return this.emailService.deleteSubscriber(subscriber);
  }

  @EventPattern({ cmd: NotifyCommandEnum.AddPost})
   public async createPost(post: PostNotifyDTO) {
    return this.emailService.addPost(post);
  }
}
