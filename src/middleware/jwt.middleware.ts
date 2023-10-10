// src/middleware/jwt.middleware

import { Inject, Middleware, httpError } from '@midwayjs/core';
import { Context, NextFunction, Response } from '@midwayjs/express';
import { JwtService } from '@midwayjs/jwt';
// import cookieConfig from '../config/config.default';

@Middleware()
export class JwtMiddleware {
  @Inject()
  jwtService: JwtService;

  public static getName(): string {
    return 'jwt';
  }

  resolve() {
    return async (req: Context & any, res: Response, next: NextFunction) => {
      // 判断下有没有校验信息
      if (!req.headers['authorization']) {
        throw new httpError.UnauthorizedError();
      }
      // const str = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiJ-WTiOWTiOWTiCciLCJpYXQiOjE2OTY4Njk1NTEsImV4cCI6MTY5NzA0MjM1MX0.wSwXiJcZjUf0S64WlGuoIbIOgGXVda463gZ0t-dYD4A'
      // 从 header 上获取校验信息
      const parts = req.get('authorization').trim().split(' ');
      // const parts = str.split(' ');
      console.log(parts, 'partsparts');
      if (parts.length !== 2) {
        throw new httpError.UnauthorizedError();
      }

      const [scheme, token] = parts;

      if (/^Bearer$/i.test(scheme)) {
        try {
          //jwt.verify方法验证token是否有效
          // 先从cookie中解密 -- 在解密token
          const midkieCookie = req.signedCookies['auth_token'];

          const decode: any = await this.jwtService.verify(
            midkieCookie,
            // cookieConfig.jwt.secret, //自动带上
            {
              complete: true,
            }
          );
          console.log(decode, '解密后的token......');
          // 别的接口通过req.session都可以访问到
          req.session.user = decode.payload.data;
        } catch (error) {
          //token过期 生成新的token
          // const newToken = getToken(user);
          //将新token放入Authorization中返回给前端
          // 设置请求头
          // req.headers['Authorization'] = newToken
          // 设置响应头
          // res.set('Authorization', newToken);
          return {
            status: 401,
            data: null,
            message: 'Token is not valid',
          };
        }
        await next();
      }
    };
  }

  // 配置忽略鉴权的路由地址
  public match(ctx: Context): boolean {
    const ignore = ctx.path.indexOf('/api/register') !== -1;
    return !ignore;
  }
}
