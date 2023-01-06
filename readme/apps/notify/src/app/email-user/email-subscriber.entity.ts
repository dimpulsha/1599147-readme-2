import { Logger } from '@nestjs/common';
import { SubscriberInterface } from '@readme/shared';

export class SubscriberEntity implements SubscriberInterface {
  public id: string;
  public email: string;
  public userName: string;


  constructor(subscriber: SubscriberInterface) {
    this.fillEntity(subscriber);
  }

  public toObject() {
    Logger.log('SubscriberEntity: toObject');
    Logger.log({ ...this });
    return { ...this };
  }


  public fillEntity(subscriber: SubscriberInterface) {
    this.id = subscriber.id;
    this.email = subscriber.email;
    this.userName = subscriber.userName;
  }

}
