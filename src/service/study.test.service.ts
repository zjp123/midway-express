import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { User } from '../entity/user';

// 27017--mock---user表
@Provide()
export class StudyTestService {

  @InjectEntityModel(User)
  userModel: ReturnModelType<typeof User>;

  async getUserTest(){
    // console.log(this.userModel, 'llllll')
    // create data
    const { _id: id } = await this.userModel.create({ name: 'JohnDoe', jobs: ['Cleaner'] } as User); // an "as" assertion, to have types for all properties

    // find data
    const user = await this.userModel.findById(id).exec();
    // const user = await this.userModel.findOne().exec();
    return user
  }
}
