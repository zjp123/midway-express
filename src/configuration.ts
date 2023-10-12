import {
  Configuration,
  App,
  Inject,
  MidwayDecoratorService,
  Config,
  IMidwayContainer,
  ALL,
} from '@midwayjs/core';
import * as express from '@midwayjs/express';
import { join } from 'path';
import { GlobalError } from './filter/global.filter-error';
import * as expressSource from 'express';
// console.log(expressSource.static, 'expressSource')
// const cookieParser = require('cookie-parser'); // 单纯的解析cookie的
import * as cookieParser from 'cookie-parser';
// const expressSource = require('express');
import cookieConfig from './config/config.default';
import * as typegoose from '@midwayjs/typegoose';
import * as mongoose from '@midwayjs/mongoose';
import * as mongo from 'mongoose';
import * as jwt from '@midwayjs/jwt';
import { JwtMiddleware } from './middleware/jwt.middleware';
import * as lodash from 'lodash';
@Configuration({
  imports: [express, typegoose, jwt],
  importConfigs: [join(__dirname, './config')],
  detectorOptions: {
    ignore: ['**/public/**'], // 忽略一些非ts类型的文件
  },
})
export class MainConfiguration {
  @Config(ALL)
  allConfig;

  @Config('mongoose')
  oldMongooseConfig;

  @App('express')
  app: express.Application;

  @Inject()
  decoratorService: MidwayDecoratorService;

  async onReady(container: IMidwayContainer) {
    console.log(this.allConfig, 'this.allConfig');
    const connectionFactory = await container.getAsync(
      mongoose.MongooseDataSourceManager
    );
    console.log(
      connectionFactory.getDataSourceNames(),
      this.oldMongooseConfig,
      'mongos config'
    );
    // for (const dataSourceName of connectionFactory.getDataSourceNames()) {
    // const conn = connectionFactory.getDataSource(dataSourceName);
    // setTimeout(async () => { // 3秒后 数据库已连接成功 这时才能正常操作 db.collections()
    //   const result = await conn.db.collection('orders').findOne()
    //   console.log(result, '当前数据库collections')
    // }, 3000);
    // }
    const conn: any = await mongo.connect(
      this.oldMongooseConfig.dataSource.default.uri,
      this.oldMongooseConfig.dataSource.default.options
    );
    // const db = conn.connection // 当前数据库
    const result = await conn.connection.collection('orders').findOne();
    console.log(result, '当前数据库collections');

    // 中间件  最后的中间件先执行
    this.app.use(expressSource.static(join(__dirname, './public')));

    // 对cookie进行加密--浏览器中看上去都是一串加密后的字符，服务端获取的时候，是解密后的
    this.app.use(cookieParser(cookieConfig.keys));

    // 这类过滤器是按照添加的顺序来匹配执行
    this.app.useFilter([GlobalError]);
    this.app.useMiddleware((req, res, next) => {
      // 在中间中设置后 在这里获取
      console.log(req.session.user, 222);
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
      console.log(options, 'options');
      return options.originArgs[0] ?? '66778899';
    });
    this.app.useMiddleware(JwtMiddleware);
    // 向依赖注入容器中添加一些全局对象
    container.registerObject('lodash', lodash);
  }
}
