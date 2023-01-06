import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { PostNotifyInterface, SubscriberInterface } from '@readme/shared';
import { EMAIL_NEW_POST_SUBJECT } from './constants/mail.constants';

 @Injectable()
 export class MailService {
   constructor(private readonly mailerService: MailerService) { }

   private preparePostNews(postList: PostNotifyInterface[]): string {
    //  let newsText = '';
     let result = '';
     postList.forEach((item) => {
        result = result + (`New post with id <a href="${item.url}" target="_blank">${item.id}</a> <br>`)
        return result;
      })
     console.log(result);
    //  console.log(newsText);
     return result;

   }

   public async sendNotifyNewSubscriber(subscriber: SubscriberInterface) {
     await this.mailerService.sendMail({
       to: subscriber.email,
       subject: EMAIL_NEW_POST_SUBJECT,
       template: './add-new-subscriber',
       context: {
         name: `${subscriber.userName}`,
         email: `${subscriber.email}`,
       }
     })
   }

  public async sendNotifyNewPost(subscriber: string, newsText: string) {
     await this.mailerService.sendMail({
       to: subscriber,
       subject: EMAIL_NEW_POST_SUBJECT,
       template: './add-new-post',
       context: {
         newsText: `${newsText}`
       }
     })
  }

   public async sendNews(userList: string[], postList: PostNotifyInterface[]) {
     const newsText = this.preparePostNews(postList);
     userList.forEach((item) => this.sendNotifyNewPost(item, newsText ))
  }
 }
