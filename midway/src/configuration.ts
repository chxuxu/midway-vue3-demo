import { Configuration, App } from '@midwayjs/decorator';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as orm from '@midwayjs/typeorm';
import * as info from '@midwayjs/info';
import { join } from 'path';
// import { DefaultErrorFilter } from './filter/default.filter';
// import { NotFoundFilter } from './filter/notfound.filter';
import { ReportMiddleware } from './middleware/report.middleware';
import cors from '@koa/cors';
import {hooks} from '@midwayjs/hooks';
@Configuration({
  imports: [
    koa,
    validate,
    {
      component: info,
      enabledEnvironment: ['local']
    },
    hooks({
      middleware: [
        cors({ origin: '*',allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'})
      ]
    }),
    orm
  ],
  importConfigs: [join(__dirname, './config')]
})
export class ContainerLifeCycle {
  @App()
  app: koa.Application;

  async onReady() {
    // add middleware
    this.app.useMiddleware([ReportMiddleware]);
    // add filter
    // this.app.useFilter([NotFoundFilter, DefaultErrorFilter]);
  }
}
