import { HttpException, Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from "rxjs";
import { AxiosError } from 'axios'
import { getUserConfig } from "../config/bff.config";

@Injectable()
export class BffUserService {

  private readonly logger = new Logger(BffUserService.name);

  private handleError = (error: AxiosError) => {
    this.logger.error(error.response.data);
    const dataObject = error.toJSON();

    this.logger.log(`object = ${dataObject}`)

    throw new HttpException( error.response.data, error.response.status);
  };

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService

  ) { }

  private userConfig = getUserConfig(this.configService);

  public async registerUser(body: Request) {
    const { data } = await firstValueFrom(
      // this.httpService
      //   .post(`http://${this.configService.get('bff.userHost')}:${this.configService.get('bff.userPort')}/api/auth/register `, req)
      //   .pipe(catchError(this.handleError))

      this.httpService
        .post(`http://${this.userConfig.host}:${this.userConfig.port}/api/auth/register `, body)
        .pipe(catchError(this.handleError))
    );

    return data;

}
}
