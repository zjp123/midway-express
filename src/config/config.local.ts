import { MidwayAppInfo, MidwayConfig } from '@midwayjs/core';
import * as dotenv from 'dotenv';
import path = require('path');

if (process.env.MIDWAY_SERVER_ENV === 'prod') {
  dotenv.config({ path: path.join(__dirname, '../../.env.prod') });
} else {
  dotenv.config({ path: path.join(__dirname, '../../.env.local') });
}
export default (appInfo: MidwayAppInfo): MidwayConfig => {
  console.log('这是本地开发环境配置', process.env.DATABASE_URL);
  return {
    localTest: 'localTest',
  };
};
