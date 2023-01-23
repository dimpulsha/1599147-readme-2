import { HttpException, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from "rxjs";
import { AxiosError } from 'axios'
import { getUserConfig } from "../config/bff.config";
import { getServiceUrl } from '@readme/core'


@Injectable()
export class BffUserService {

  private readonly logger = new Logger(BffUserService.name);

  private handleError = (error: AxiosError) => {
    if (error.response) {
      this.logger.error(error.response.data);
      throw new HttpException(error.response.data, error.response.status);
    } else {
      this.logger.error(error);
       throw new InternalServerErrorException (error.message)
    }
  };

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService
  ) { }

  private userServiceUrl = getServiceUrl(getUserConfig(this.configService));

  public async registerUser(body: Request) {
    const { data } = await firstValueFrom(

      this.httpService
        .post(`${this.userServiceUrl}/api/auth/register`, body)
        .pipe(catchError(this.handleError))
    );

    return data;

}
}
