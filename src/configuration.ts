import {
  Configuration,
  App,
  Inject,
  MidwayDecoratorService,
} from '@midwayjs/core';
import * as express from '@midwayjs/express';
import { join } from 'path';
import { GlobalError } from './filter/global.filter-error';
import * as expressSource from 'express';
// console.log(expressSource.static, 'expressSource')
const cookieParser = require('cookie-parser'); // 单纯的解析cookie的
// const expressSource = require('express');
import cookieConfig from './config/config.default';
@Configuration({
  imports: [express],
  importConfigs: [join(__dirname, './config')],
})
export class MainConfiguration {
  @App('express')
  app: express.Application;

  @Inject()
  decoratorService: MidwayDecoratorService;

  async onReady() {
    // 中间件  最后的中间件先执行
    this.app.use(expressSource.static(join(__dirname, './public')));

    // 对cookie进行加密--浏览器中看上去都是一串加密后的字符，服务端获取的时候，是解密后的
    this.app.use(cookieParser(cookieConfig.keys));

    // 这类过滤器是按照添加的顺序来匹配执行
    this.app.useFilter([GlobalError]);
    this.app.useMiddleware((req, res, next) => {
      console.log(222);
      req.session.userName = 'zjp888';
      // 单纯cookie 写法
      res.cookie('test-midkie', '123', {
        // 1个小时
        expires: new Date(Date.now() + 1 * 3600000),
        httpOnly: true,
        signed: true,
      });
      next();
    });
    this.decoratorService.registerParameterHandler('reg-valid', options => {
      // originArgs 是原始的方法入参
      // 这里第一个参数是 ctx，所以取 ctx.user
      // return '66778899';
      console.log(options, 'options');
      return options.originArgs[0] ?? '66778899';
    });
  }
}
