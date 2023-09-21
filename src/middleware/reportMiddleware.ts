import { IMiddleware, Middleware } from '@midwayjs/core';
import { Context, Response, NextFunction } from '@midwayjs/express';

@Middleware()
export class ReportMiddleware implements IMiddleware<Context, Response, NextFunction> {
  resolve() {
    return async (req: Context, res: Response, next: NextFunction) => {
      console.log('Request...');
      next();
    };
  }
}
