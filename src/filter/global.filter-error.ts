import { Catch, MidwayHttpError, httpError } from '@midwayjs/core';
import { Context, Response } from '@midwayjs/express';

@Catch()
export class GlobalError {
  catch(err: Error | any, ctx: Context, res: Response) {
    if (err) {
      // console.log(111111, err);
      ctx.logger.error(err);
      return {
        code: err.status ?? 500,
        data: null,
        message: err.message,
      };
    }
  }
}

@Catch(httpError.NotFoundError)
export class NotFoundFilter {
  async catch(err: MidwayHttpError, ctx: Context, res: Response) {
    // 404 错误会到这里
    if (err) {
      // console.log('404了吗');
      ctx.logger.error(err);
      res.redirect('/404.html');
    }
  }
}
