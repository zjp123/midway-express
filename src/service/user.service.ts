import { Provide } from '@midwayjs/core';
import { IUserOptions } from '../interface';
import { CutPipe, RegValid } from '../pipe/diy-pipe';
import { InjectEntityModel } from '@midwayjs/typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { User } from '../entity/user';

@Provide()
export class UserService {
  @InjectEntityModel(User)
  userModel: ReturnModelType<typeof User>;

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
  async getDataBaseUser() {
    // create data
    const { _id: id } = await this.userModel.create({
      name: 'JohnDoe',
      jobs: ['Cleaner'],
    } as User); // an "as" assertion, to have types for all properties

    // find data
    const user = await this.userModel.findById(id).exec();
    console.log(user);
  }
}
