import {Controller, HttpStatus, Logger, Param, Post} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { MailCommandEnum } from '@readme/shared';
import { INVALID_EMAIL_COMMAND } from './constants/email-data.constants';
import { EmailDataService } from './email-data.service';

@ApiTags('notification')
@Controller('notification')
export class EmailRESTController {

  constructor(
         private readonly emailService: EmailDataService ){ }

  @Post(':comm')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Start notification.'
  })
  public async create(@Param('comm') command: MailCommandEnum) {
    Logger.log('Notify.REST controller: accept request auth/register');
    if (command !== MailCommandEnum.StartNonification)
      {throw  new Error(INVALID_EMAIL_COMMAND)}
   await this.emailService.startPostNotification();
  }
}
