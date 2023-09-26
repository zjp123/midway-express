import { Controller, Get, Inject, Query } from '@midwayjs/core';
import { Context } from '@midwayjs/express';
import { ReportMiddleware } from '../middleware/reportMiddleware';
import { CutPipe } from '../pipe/diy-pipe';

@Controller('/')
export class HomeController {
  @Inject()
  ctx: Context;

  @Get('/', { middleware: [ReportMiddleware] })
  async home(@Query() query: CutPipe): Promise<string> {
    // const cookieValue = this.ctx.cookies['test-midkie'];
    const cookieValue = this.ctx.signedCookies['test-midkie'];
    console.log(query, cookieValue, 'cookie');
    return 'Hello Midwayjs!';
  }
}
