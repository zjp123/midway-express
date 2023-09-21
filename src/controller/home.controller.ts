import { Controller, Get, Inject } from '@midwayjs/core';
import { Context } from '@midwayjs/express';

@Controller('/')
export class HomeController {
  @Inject()
  ctx: Context;

  @Get('/')
  async home(): Promise<string> {
    const cookieValue = this.ctx.cookies['test-midkie'];
    console.log(cookieValue, 'cookie');
    return 'Hello Midwayjs!';
  }
}
