import { Provide } from '@midwayjs/core';
import { IUserOptions } from '../interface';
import { CutPipe, RegValid } from '../pipe/diy-pipe';

@Provide()
export class UserService {
  async getUser(options: IUserOptions) {
    return {
      uid: options.uid,
      username: 'mockedName',
      phone: '12345678901',
      email: 'xxx.xxx@xxx.com',
    };
  }
  async invoke(@RegValid(/\d{11}/, CutPipe) phoneNumber: string) {
    return {
      uid: phoneNumber,
      username: 'mockedName',
      phone: '12345678901',
      email: 'xxx.xxx@xxx.com',
    };
  }
  async invoke2(phoneNumber: string) {
    return {
      uid: phoneNumber,
      username: '周杰伦',
      age: 18,
    };
  }
}
