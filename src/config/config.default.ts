import { MidwayConfig } from '@midwayjs/core';
import { User } from '../entity/user';
// Cookie
export default {
  keys: '1695094587438_6666', // use for cookie sign key, should change to your own and keep security
  express: {
    port: 7001,
    contextLoggerFormat: info => {
      // 等价 req
      const req = info.ctx;
      const userName = req?.['session']?.['userName'] || '-';
      return `${info.timestamp} ${info.LEVEL} ${info.pid} [${userName} - ${
        Date.now() - req.startTime
      }ms ${req.method}] ${info.message}`;
    },
  },
  session: {
    // cookie-session
    name: 'kkk-woiwoi', // cookie 名称
    resave: true,
    keys: ['love-zjy'], // 用于签名的密钥，可以是一个数组以提供多个密钥
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 3600 * 1000, // ms
      httpOnly: true,
      // sameSite: null,
    },
  },
  mongoose: {
    dataSource: {
      default: {
        uri: 'mongodb://localhost:27017/mock',
        options: {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          user: 'zjp',
          pass: '123456',
          authSource: 'admin',
          // autoReconnect: true, // 无效 mongoose 6版本已去掉，查看官方文档，不要看中文文档
          maxPoolSize: 10,
          // maxTimeMS: 30, 查询时设置
          socketTimeoutMS: 30000, // 设置连接空闲时间的阈值为 30 秒
          connectTimeoutMS: 20000, // 设置连接超时时间为 20 秒
          maxIdleTimeMS: 60000, // 设置连接空闲时间的最大值为 1 分钟
          // reconnectTries: 30, // 设置在断开连接后尝试重新连接的最大次数，默认为 30 次  无效 无效 mongoose 6版本已去掉，查看官方文档，不要看中文文档
          // reconnectInterval: 1000, // 设置两次重新连接尝试之间的等待时间，默认为 1000 毫秒（1 秒） 无效 无效 mongoose 6版本已去掉，查看官方文档，不要看中文文档
        },
        // 关联实体
        entities: [User],
      },
    },
  },
} as MidwayConfig;
