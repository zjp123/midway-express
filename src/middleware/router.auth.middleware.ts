import {
  Middleware,
  Inject,
  httpError,
  MidwayWebRouterService,
} from '@midwayjs/core';

@Middleware()
export class RouterAuthMiddleware {
  @Inject()
  webRouterService: MidwayWebRouterService;

  resolve() {
    return async (ctx, res, next) => {
      // 查询当前路由是否在路由表中注册
      const routeInfo = await this.webRouterService.getMatchedRouterInfo(
        ctx.path,
        ctx.method
      );
      if (routeInfo) {
        await next();
      } else {
        throw new httpError.NotFoundError();
      }
    };
  }
}
