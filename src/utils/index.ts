import { Provide, Scope, ScopeEnum } from '@midwayjs/core';
import * as mongo from 'mongoose';

@Provide()
@Scope(ScopeEnum.Request, { allowDowngrade: true })
export class DBConnect {
  private db;

  async createConnection(oldMongooseConfig) {
    const conn: any = await mongo.connect(
      oldMongooseConfig.dataSource.default.uri,
      oldMongooseConfig.dataSource.default.options
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
