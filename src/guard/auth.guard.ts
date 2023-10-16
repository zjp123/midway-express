import { IMiddleware, Guard, IGuard } from '@midwayjs/core';
import { Context } from '@midwayjs/express';

@Guard()
export class AuthGuard implements IGuard<Context> {
  async canActivate(
    context: Context,
    mongodb,
    methodName: string
  ): Promise<boolean> {
    // ...
    console.log(mongodb, '守卫的参数是什么');
    return true;
  }
}

/*
canActivate 方法用于在请求中验证是否可以访问后续的方法，
当返回 true 时，后续的方法会被执行，
当 canActivate 返回 false 时，会抛出 403 错误码

注意，当前只有类 Controller 才能使用守卫。

*/
