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
        uri: 'mongodb://localhost:27017/test',
        options: {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          user: '***********',
          pass: '***********',
        },
        // 关联实体
        entities: [User],
      },
    },
  },
} as MidwayConfig;
