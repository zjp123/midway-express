import { MidwayConfig } from '@midwayjs/core';
// Cookie
export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1695094587438_6666',
  express: {
    port: 7001,
  },
  session: {
    name: 'kkk-session',
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 3600 * 1000, // ms
      httpOnly: true,
      // sameSite: null,
    },
  },
} as MidwayConfig;
