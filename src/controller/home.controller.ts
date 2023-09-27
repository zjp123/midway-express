import { Controller, Get, Inject, Query } from '@midwayjs/core';
import { Response, Context } from '@midwayjs/express';
import { ReportMiddleware } from '../middleware/reportMiddleware';
import { CutPipe } from '../pipe/diy-pipe';

@Controller('/')
export class HomeController {
  @Inject()
  ctx: any;

  @Inject()
  res: Response;

  @Get('/', { middleware: [ReportMiddleware] })
  async home(@Query() query: CutPipe): Promise<string> {
    // const cookieValue = this.ctx.cookies['test-midkie'];
    const midkieCookie = this.ctx.signedCookies['test-midkie'];
    // const cookieArr = this.ctx.cookies;
    const session_user_name = this.ctx.session.userName;
    console.log(query, midkieCookie, session_user_name, 'session_user_name');
    return 'Hello Midwayjs!';
  }
}
