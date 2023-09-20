import { Configuration, App } from '@midwayjs/core';
import * as express from '@midwayjs/express';
import { join } from 'path';
import { GlobalError } from './filter/global.filter';
// eslint-disable-next-line node/no-extraneous-import
import * as expressSource from 'express';
// console.log(expressSource.static, 'expressSource')

@Configuration({
  imports: [express],
  importConfigs: [join(__dirname, './config')],
})
export class MainConfiguration {
  @App('express')
  app: express.Application;

  async onReady() {
    this.app.use(expressSource.static(join(__dirname, './public')));
    this.app.useFilter([GlobalError]);
  }
}
