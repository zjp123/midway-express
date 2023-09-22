import { Controller, Get, Inject } from '@midwayjs/core';
import { Context } from '@midwayjs/express';
import { ReportMiddleware } from '../middleware/reportMiddleware';

@Controller('/')
export class HomeController {
  @Inject()
  ctx: Context;

  @Get('/', { middleware: [ReportMiddleware] })
  async home(): Promise<string> {
    // const cookieValue = this.ctx.cookies['test-midkie'];
    const cookieValue = this.ctx.signedCookies['test-midkie'];
    console.log(cookieValue, 'cookie');
    return 'Hello Midwayjs!';
  }
}
