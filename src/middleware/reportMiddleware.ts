import { IMiddleware, Inject, Middleware } from '@midwayjs/core';
import { Context, Response, NextFunction } from '@midwayjs/express';
import { UserService } from '../service/user.service';

@Middleware()
export class ReportMiddleware
  implements IMiddleware<Context, Response, NextFunction>
{
  // @Inject()
  // userService: UserService;

  @Inject('lodash')
  lodashTool;

  resolve() {
    return async (ctx: Context, res: Response, next: NextFunction) => {
      console.log('Request...');
      const userService = await ctx.requestContext.getAsync(UserService);
      userService.testSingleApi();
      next();
    };
  }
}
