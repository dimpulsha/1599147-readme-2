import { HttpException, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from "rxjs";
import { AxiosError } from 'axios'
import { getUserConfig } from "../config/bff.config";
import { getServiceUrl } from '@readme/core'
import { UserAPIUr } from "../constatns/bff-helper";
import { CreateUserDTO } from "./dto/create-user.dto";
import { LoginUserDTO } from "./dto/login-user.dto";


@Injectable()
export class BffUserService {

  private readonly logger = new Logger(BffUserService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService
  ) { }

  private userServiceUrl = getServiceUrl(getUserConfig(this.configService));

  private handleError = (error: AxiosError) => {
    if (error.response) {
      this.logger.error(error.response.data);
      throw new HttpException(error.response.data, error.response.status);
    } else {
      this.logger.error(error);
       throw new InternalServerErrorException (error.message)
    }
  };

  private async handleRequestPost (url: string, body: object | null , token?: string) {
     const { data } = await firstValueFrom(this.httpService
            .post(`${url}`,
              body ? body : null,
              token ? {headers: {'Authorization': token}} : null)
            .pipe(catchError(this.handleError))
    );

    return data;

  }

   private async handleRequestGet (url: string, token?: string) {
     const { data } = await firstValueFrom(this.httpService
            .get(`${url}`,
              token ? {headers: {'Authorization': token}} : null)
            .pipe(catchError(this.handleError))
    );

    return data;

  }

  public async registerUser(body: CreateUserDTO) {
   return await this.handleRequestPost( UserAPIUr.Register(this.userServiceUrl), body)

  }

  public async login(body: LoginUserDTO) {
   return await this.handleRequestPost(UserAPIUr.Login(this.userServiceUrl), body)

  }

  public async getUser(id: string, token: string) {
    this.logger.log(token);
    this.logger.log(id);

   return await this.handleRequestGet(`${UserAPIUr.GetUser(this.userServiceUrl)}${id}`, token)

  }
}
