import { Inject, Controller, Get, Query } from '@midwayjs/core';
import { Context } from '@midwayjs/express';
import { UserService } from '../service/user.service';

@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Get('/get_user')
  async getUser(@Query('uid') uid) {
    const user = await this.userService.getUser({ uid });
    return { success: true, message: 'OK', data: user };
  }
  @Get('/get_invoke')
  async getInvoke() {
    const user = await this.userService.invoke('12345678');
    console.log(user, 'useruser');
    return { success: true, message: 'OK', data: user };
  }
}
