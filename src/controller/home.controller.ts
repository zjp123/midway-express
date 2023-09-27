import { Controller, Get, Inject } from '@midwayjs/core';
import { Context, Response } from '@midwayjs/express';
import { ReportMiddleware } from '../middleware/reportMiddleware';

@Controller('/')
export class HomeController {
  @Inject()
  ctx: any;

  @Inject()
  res: Response;

  @Get('/', { middleware: [ReportMiddleware] })
  async home(): Promise<string> {
    // const cookieValue = this.ctx.cookies['test-midkie'];
    const midkieCookie = this.ctx.signedCookies['test-midkie']
    // const cookieArr = this.ctx.cookies;
    const session_user_name = this.ctx.session.userName;
    console.log(midkieCookie, session_user_name, 'session_user_name');
    return 'Hello Midwayjs!';
  }
}
