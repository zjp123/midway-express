<<<<<<< HEAD
import { Controller, Get, Inject } from '@midwayjs/core';
import { Context, Response } from '@midwayjs/express';
=======
import { Controller, Get, Inject, Query } from '@midwayjs/core';
import { Context } from '@midwayjs/express';
>>>>>>> 5f875ac1c346538619cd96bf32eae4981590a095
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
<<<<<<< HEAD
    const midkieCookie = this.ctx.signedCookies['test-midkie']
    // const cookieArr = this.ctx.cookies;
    const session_user_name = this.ctx.session.userName;
    console.log(midkieCookie, session_user_name, 'session_user_name');
=======
    const cookieValue = this.ctx.signedCookies['test-midkie'];
    console.log(query, cookieValue, 'cookie');
>>>>>>> 5f875ac1c346538619cd96bf32eae4981590a095
    return 'Hello Midwayjs!';
  }
}
