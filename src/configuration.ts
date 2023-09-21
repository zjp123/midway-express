import { Configuration, App } from '@midwayjs/core';
import * as express from '@midwayjs/express';
import { join } from 'path';
import { GlobalError } from './filter/global.filter-error';
import * as expressSource from 'express';
// console.log(expressSource.static, 'expressSource')
const cookieParser = require('cookie-parser');
// const expressSource = require('express');
import cookieSec from './config/config.default';
@Configuration({
  imports: [express],
  importConfigs: [join(__dirname, './config')],
})
export class MainConfiguration {
  @App('express')
  app: express.Application;

  async onReady() {
    // 中间件  最后的中间件先执行
    this.app.use(expressSource.static(join(__dirname, './public')));
    // 对cookie进行加密--浏览器中看上去都是一串加密后的字符，服务端获取的时候，是解密后的
    this.app.use(cookieParser(cookieSec.keys));
    // 这类过滤器是按照添加的顺序来匹配执行
    this.app.useFilter([GlobalError]);
    this.app.useMiddleware((req, res, next) => {
      console.log(222);
      // res.cookie('test-midkie', '123', { maxAge: 3600 });
      res.cookie('test-midkie', '123', {
        // 1个小时
        expires: new Date(Date.now() + 1 * 3600000),
        httpOnly: true,
        signed: true,
      });
      next();
    });
  }
}
