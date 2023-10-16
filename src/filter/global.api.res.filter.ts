import { Match } from '@midwayjs/core';
import { Context, Response } from '@midwayjs/express';

// 也可以匹配特定的路由做返回--- 返回统一处理
@Match((ctx: Context, res: Response) => {
  return ctx.path === '/api';
})
export class APIMatchFilter {
  match(value, req: Context, res: Response) {
    // ...
    return {
      message: 'ok',
      data: [1, 2, 3],
      code: 200,
    };
  }
}
