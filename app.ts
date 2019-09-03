#!/usr/bin/env ts-node
console.time();
import './src/utils/Env';
import path from 'path';
import Koa from 'koa';
import nuxt from './src/middleware/nuxt';
const app = new Koa();
nuxt(app);
const args = process.argv.splice(2);
if (args[0] === '--apidoc') {
    import('./src/middleware/apidoc').then(apidoc => {
        apidoc.default({
            src: path.join(__dirname, './controller/'),
            dest: path.join(__dirname, './dist/')
        });
    });
}

/**
 * 导入中间件
 * @param { Function } InitMiddleware
 * */
import InitMiddleware from './src/middleware';
new InitMiddleware(app);
import Route from './src/router';
new Route(app);

const server:any = app.listen(process.env.PORT, () => {
    console.timeEnd()
    console.log("启动端口" + server.address().port);
});

export default app;
