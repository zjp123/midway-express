import { Inject, Controller, Get, Query } from '@midwayjs/core';
import { Context, Response } from '@midwayjs/express';
import { UserService } from '../service/user.service';
import { CutPipe } from '../pipe/diy-pipe';
import { JwtService } from '@midwayjs/jwt';

@Controller('/api')
export class APIController {

  @Inject()
  jwtService: JwtService;

  @Inject()
  ctx: Context;

  @Inject()
  res: Response;

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
  @Get('/get_invoke2')
  async getInvoke2(@Query('size', [CutPipe]) size) {
    const user = await this.userService.invoke2(size);
    console.log(size, 'sizesize');
    // this.ctx.logger.error(new Error('custom error'));
    return { success: true, message: 'OK', data: user };
  }
  @Get('/register')
  async register(@Query('name') name) {
    const token = this.jwtService.signSync({data: name});
    this.res.set('Authorization', token);
    return {status: 200, data: {token}, message: 'ok'}
  }
}
