import { MidwayAppInfo, MidwayConfig } from '@midwayjs/core';

export default (appInfo: MidwayAppInfo): MidwayConfig => {
  console.log('这是线上开发环境配置', process.env.DATABASE_URL);
  return {
    localTest: 'localTest',
    strategy: {
      gw: {
        // https://gw.alicdn.com/tfs/TB1.1EzoBBh1e4jSZFhXXcC9VXa-48-48.png
        match: /\/tfs\//,
        host: 'https://gw.alicdn.com',
      },
      g: {
        // https://g.alicdn.com/mtb/lib-mtop/2.6.1/mtop.js
        match: /\/bdimg\/(.*)$/,
        target: 'https://sm.bdimg.com/$1',
      },
      httpBin: {
        // https://httpbin.org/
        match: /\/httpbin\/(.*)$/,
        target: 'https://httpbin.org/$1',
      },
    },
  };
};
