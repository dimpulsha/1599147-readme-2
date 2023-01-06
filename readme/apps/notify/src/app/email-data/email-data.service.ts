import { Injectable, Logger } from '@nestjs/common';
import { PostNotifyDTO } from './dto/new-post.dto';
import { PostNotifyEntity } from '../email-post/email-post.entity';
import { PostNotifyRepository } from '../email-post/email-post.repository';
import { MailService } from '../mail/mail.service';
import { SUBSCRIBER_EXIST } from './constants/email-data.constants';
import { SubscriberDTO } from './dto/subscriber.dto';
import { EmailSubscriberRepository } from '../email-user/email-subscriber.repository';
import { SubscriberEntity } from '../email-user/email-subscriber.entity';
import { PostNotifyInterface, SubscriberInterface } from '@readme/shared';
// import { SubscriberEntity } from './email-subscriber.entity';
// import { EmailSubscriberRepository } from './email-subscriber.repository';

@Injectable()
export class EmailDataService {
  constructor(
    private readonly emailSubscriberRepository: EmailSubscriberRepository,
    private readonly postNotifyRepository: PostNotifyRepository,
    private readonly mailService: MailService,
    ) {}

  private async getPosts(): Promise<PostNotifyInterface[]> {
    const result = await this.postNotifyRepository.getList();
    return result
  }

  private async getSubscribersList(): Promise<SubscriberInterface[]> {
    const result = await this.emailSubscriberRepository.getList();
    return result;
  }

  private prepareUserList(userData: SubscriberInterface[]): string[] {
    const result = userData.map(({ email }) => email);
    return result;
  }

  private preparePostList(postData: PostNotifyInterface[]) {
    const result = postData.map(({ url, id}) => ({ url, id}))
    return result;
  }

  public async addSubscriber(subscriber: SubscriberDTO) {
    const { email } = subscriber;
    const existsSubscriber = await this.emailSubscriberRepository.getByEmail(email);

    if (existsSubscriber) {
      throw new Error(SUBSCRIBER_EXIST);
    }
    const result =  await this.emailSubscriberRepository.create(new SubscriberEntity(subscriber));
    await this.mailService.sendNotifyNewSubscriber(subscriber);

    return result;
  }

  public async deleteSubscriber(subscriber: SubscriberDTO) {
      const { id } = subscriber;

    await this.emailSubscriberRepository.delete(id);
  }

  public async addPost(post: PostNotifyDTO) {
    Logger.log('create post record')
    return await this.postNotifyRepository.create(new PostNotifyEntity(post));
  }

  public async startPostNotification() {
    Logger.log('Start post Notification');
    const userList = await this.emailSubscriberRepository.getList();
    const userEmailList = this.prepareUserList(userList);

    const postList = await this.postNotifyRepository.getList();

    const postNotificationList = this.preparePostList(postList);

    await this.mailService.sendNews(userEmailList, postNotificationList);
    await this.postNotifyRepository.clear();
    return ('EmailDataService: post notification started');
  }


 }
