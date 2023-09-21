import { Match } from '@midwayjs/core';
// import { Context, Response } from '@midwayjs/express';

// 返回统一处理
@Match()
export class GlobalMatchFilter {
  match(value, req, res) {
    // ...
    return {
      status: 200,
      data: {
        value,
      },
    };
  }
}
