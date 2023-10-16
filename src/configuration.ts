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
import { GlobalError, NotFoundFilter } from './filter/global.filter-error';
import * as expressSource from 'express';
// console.log(expressSource.static, 'expressSource')
// const cookieParser = require('cookie-parser'); // 单纯的解析cookie的
import * as cookieParser from 'cookie-parser';
// const expressSource = require('express');
import cookieConfig from './config/config.default';
import * as typegoose from '@midwayjs/typegoose';
import * as mongoose from '@midwayjs/mongoose';
// import * as mongo from 'mongoose';
import * as jwt from '@midwayjs/jwt';
import { JwtMiddleware } from './middleware/jwt.middleware';
import { RouterAuthMiddleware } from './middleware/router.auth.middleware';
import * as lodash from 'lodash';
import * as validate from '@midwayjs/validate';
// import { DBConnect } from './service/db.connect';
import { DBConnect } from './utils/index';
import * as crossDomain from '@midwayjs/cross-domain';
import * as info from '@midwayjs/info';
import * as axios from '@midwayjs/axios';
import * as proxy from '@midwayjs/http-proxy';
@Configuration({
  imports: [express, typegoose, jwt, validate, crossDomain, info, axios, proxy],
  importConfigs: [join(__dirname, './config')],
  detectorOptions: {
    ignore: ['**/public/**'], // 忽略一些非ts类型的文件
  },
})
export class MainConfiguration {
  // MainConfiguration 模块里面的都是 单例作用域 请注意，凡是注入进来的模块都会 作用域降级处理
  // @Config('ALL')
  @Config('session') // 配置文件中的key
  allConfig;

  @Config('mongoose')
  oldMongooseConfig;

  @App('express')
  app: express.Application;

  @Inject()
  decoratorService: MidwayDecoratorService;

  @Inject()
  dbDBConnect: DBConnect;

  /*
  这里的 ready 指的是依赖注入容器 ready，并不是应用 ready，
  所以你可以对应用做任意扩展，比如添加中间件，连接数据库等等。
  */
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
    await this.dbDBConnect.createConnection();
    /*
      数据库连接模块

      const conn: any = await mongo.connect(
        this.oldMongooseConfig.dataSource.default.uri,
        this.oldMongooseConfig.dataSource.default.options
      );
      const db = conn.connection; // 当前数据库
      db.on('error', console.error.bind(console, '数据库连接错误'));

      db.once('open', async () => {
        console.log('成功连接到数据库');
      });
      const result = await db.collection('orders').findOne();
      console.log(result, '当前数据库collections');
  */
    // 中间件  最后的中间件先执行
    this.app.use(expressSource.static(join(__dirname, './public')));

    // 对cookie进行加密--浏览器中看上去都是一串加密后的字符，服务端获取的时候，是解密后的
    this.app.use(cookieParser(cookieConfig.keys));

    // 这类过滤器是按照添加的顺序来匹配执行
    this.app.useFilter([GlobalError, NotFoundFilter]);
    this.app.useMiddleware((req, res, next) => {
      // 在中间中设置后 在这里获取
      console.log(req.session.user, '222MainConfiguration');
      req.session.userName = 'zjp888';
      // 单纯cookie 写法
      res.cookie('test-midkie', '123', {
        // 1个小时
        overwrite: true,
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
    this.app.useMiddleware(RouterAuthMiddleware);
    // 向依赖注入容器中添加一些全局对象
    container.registerObject('lodash', lodash);
  }
  async onConfigLoad() {
    // 直接返回数据，会自动合并到配置中
    return {
      test: 1,
    };
  }
  /*
  当要获取框架的服务对象，端口等信息时，就需要用到这个生命周期。
  */
  async onServerReady(container: IMidwayContainer): Promise<void> {
    // 获取到 koa 中暴露的 Framework
    // const framework = await container.getAsync(koa.Framework);
    // const server = framework.getServer();
    // ...
  }
  async onStop(): Promise<void> {
    // 关闭数据库连接
    await this.dbDBConnect.stop();
  }
}
