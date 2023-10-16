import { Autoload, Config, Destroy, Init, Provide, Scope, ScopeEnum } from '@midwayjs/core';
import * as mongo from 'mongoose';

// 也可以参考文档中数据源管理那块抽出来
@Provide()
@Scope(ScopeEnum.Request, { allowDowngrade: true })
export class DBConnect {

  @Config('mongoose')
  mongooseConfig;

  private db;

  async createConnection() {
    const conn: any = await mongo.connect(
      this.mongooseConfig.dataSource.default.uri,
      this.mongooseConfig.dataSource.default.options
    );
    this.db = conn.connection; // 当前数据库
    this.db.on('error', console.error.bind(console, '数据库连接错误'));

    this.db.once('open', async () => {
      console.log('成功连接到数据库');
    });
  }
  async stop() {
    await this.db.close();
  }
}

// 下面是第二种实现 不用再onready中手动执行
// 这样无需在 onReady 中使用 getAsync 方法即可自动初始化，并执行 init 方法。

@Autoload()
@Provide()
@Scope(ScopeEnum.Request, { allowDowngrade: true })
export class DBConnect2 {

  @Config('mongoose')
  mongooseConfig;

  @Init()
  async init() {
    console.log('是自动执行吗')
    // const conn: any = await mongo.connect(
    //   this.mongooseConfig.dataSource.default.uri,
    //   this.mongooseConfig.dataSource.default.options
    // );
    // const db = conn.connection; // 当前数据库
    // db.on('error', console.error.bind(console, '数据库连接错误22'));

    // db.once('open', async () => {
    //   console.log('成功连接到数据库22');
    // })
    // db.on('disconnected', async () => {
    //   console.log('数据库断开连接22');
    // })
  }

  @Destroy()
  async stop() {
    // db.close
  }
}

/*
const cors = {
  // 允许跨域的方法，【默认值】为 GET,HEAD,PUT,POST,DELETE,PATCH
  allowMethods: string |string[];
  // 设置 Access-Control-Allow-Origin 的值，【默认值】会获取请求头上的 origin
  // 也可以配置为一个回调方法，传入的参数为 request，需要返回 origin 值
  // 例如：http://test.midwayjs.org
  // 如果设置了 credentials，则 origin 不能设置为 *
  origin: string|Function;
  // 设置 Access-Control-Allow-Headers 的值，【默认值】会获取请求头上的 Access-Control-Request-Headers
  allowHeaders: string |string[];
  // 设置 Access-Control-Expose-Headers 的值
  exposeHeaders: string |string[];
  // 设置 Access-Control-Allow-Credentials，【默认值】false
   // 也可以配置为一个回调方法，传入的参数为 request，返回值为 true 或 false
  credentials: boolean|Function;
  // 是否在执行报错的时候，把跨域的 header 信息写入到 error 对的 headers 属性中，【默认值】false
  keepHeadersOnError: boolean;
  // 设置 Access-Control-Max-Age
  maxAge: number;
}
*/

/*
ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Credentials', true);
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With, zjp, ctt');

*/

export const cors = {
  'origin': '*',
  'credentials': true,
  'allowHeaders': ['Content-Type', 'Content-Length', 'Authorization', 'Accept', 'X-Requested-With']
}
