// src/middleware/jwt.middleware

import { Inject, Middleware, httpError } from '@midwayjs/core';
import { Context, NextFunction, Response } from '@midwayjs/express';
import { JwtService } from '@midwayjs/jwt';
import cookieConfig from '../config/config.default';

@Middleware()
export class JwtMiddleware {
  @Inject()
  jwtService: JwtService;

  public static getName(): string {
    return 'jwt';
  }

  resolve() {
    return async (ctx: Context & any, res: Response, next: NextFunction) => {
      // 判断下有没有校验信息
      // if (!ctx.headers['authorization']) {
      //   throw new httpError.UnauthorizedError();
      // }
      const str = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiJ-WTiOWTiOWTiCciLCJpYXQiOjE2OTY4Njk1NTEsImV4cCI6MTY5NzA0MjM1MX0.wSwXiJcZjUf0S64WlGuoIbIOgGXVda463gZ0t-dYD4A'
      // 从 header 上获取校验信息
      // const parts = ctx.get('authorization').trim().split(' ');
      const parts = str.split(' ');
      console.log(parts, 'partsparts')
      if (parts.length !== 2) {
        throw new httpError.UnauthorizedError();
      }

      const [scheme, token] = parts;

      if (/^Bearer$/i.test(scheme)) {
        try {
          //jwt.verify方法验证token是否有效
          const decode = await this.jwtService.verify(token, cookieConfig.jwt.secret, {
            complete: true,
          });
          console.log(decode, '解密后的token......')
          ctx.user = decode;
        } catch (error) {
          //token过期 生成新的token
          // const newToken = getToken(user);
          //将新token放入Authorization中返回给前端
          // ctx.headers['Authorization'] = newToken
          // res.set('Authorization', newToken);
          return {
            status: 401,
            data: null,
            message: 'Token is not valid'
          }
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
