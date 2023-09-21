import { Match } from '@midwayjs/core';
import { Context, Response } from '@midwayjs/express';

// 也可以匹配特定的路由做返回
@Match((ctx: Context, res: Response) => {
  return ctx.path === '/api';
})
export class APIMatchFilter {
  match(value, req: Context, res: Response) {
    // ...
    return {
      data: {
        message: '',
        data: value,
      },
    };
  }
}
