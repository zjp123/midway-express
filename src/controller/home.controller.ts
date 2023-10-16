import {
  Controller,
  Get,
  Inject,
  Query,
  FORMAT,
  UseGuard,
} from '@midwayjs/core';
import { Response, Context } from '@midwayjs/express';
import { ReportMiddleware } from '../middleware/reportMiddleware';
import { CutPipe } from '../pipe/diy-pipe';
import { AuthGuard } from '../guard/auth.guard';

@UseGuard(AuthGuard)
@Controller('/')
export class HomeController {
  @Inject()
  ctx: any; // 它就是req

  @Inject()
  res: Response;

  @Get('/', { middleware: [ReportMiddleware] })
  async home(@Query() query: CutPipe): Promise<string> {
    // const cookieValue = this.ctx.cookies['test-midkie'];
    const midkieCookie = this.ctx.signedCookies['test-midkie'];
    // const cookieArr = this.ctx.cookies;
    const session_user_name = this.ctx.session.userName;
    // if (rememberMe) {
    //   this.ctx.session.maxAge = FORMAT.MS.ONE_DAY * 30;
    // }
    console.log(
      query,
      midkieCookie,
      session_user_name,
      'session_user_name-HomeController'
    );
    return 'Hello Midwayjs!';
  }

  // @UseGuard(AuthGuard)
  @Get('/lanjieqi')
  async lanjieqi(@Query() query: CutPipe): Promise<string> {
    return '拦截器';
  }
}
