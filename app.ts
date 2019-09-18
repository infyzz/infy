#!/usr/bin/env ts-node
console.time();
global.__base = __dirname + '/';
declare global {
    namespace NodeJS {
        interface Global {
            __base: string;
        }
    }
}

import './src/utils/Env';
import Koa from 'koa';
import nuxt from './src/middleware/nuxt';
const app = new Koa();
nuxt(app);

/**
 * 导入中间件
 * @param { Function } InitMiddleware
 * */
import InitMiddleware from './src/middleware';
new InitMiddleware(app);
import Route from './src/router';
new Route(app);

const server: any = app.listen(process.env.PORT, () => {
    console.timeEnd();
    console.log('启动端口' + server.address().port);
});

export default app;
