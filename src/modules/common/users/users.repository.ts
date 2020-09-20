import { Injectable } from '@nestjs/common';
import { User } from './dtos/http/user.interface';
import { AxiosError } from 'axios';
import { Config } from '../../../common/utils/config';

const axios = require('axios').default;

@Injectable()
export class UsersRepository {
  readonly baseUrl = Config.employeesUrl;

  private async getData<T>(uri: string): Promise<T | null> {
    try {
      const res = await axios.get(uri);
      return res.data;
    } catch (error) {
      const e: AxiosError = error;
      switch (e.response.data.status) {
        case 404:
          return null;
        default:
          throw e;
      }
    }
  }

  async getUser(id: string): Promise<User | null> {
    return this.getData(this.baseUrl + '/employees/' + id);
  }

  async getUsers(): Promise<Array<User>> {
    const users = await this.getData<{data: Array<User>}>(this.baseUrl + '/employees');
    return users.data
  }

}
