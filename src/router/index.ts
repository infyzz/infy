import path from 'path';
import Router from 'koa-router';
import Koa from 'koa';
import glob from 'glob';
import { logger } from '../utils';
/**
 * url参数
 * list/:id?username=zhangsan&&age=30
 * @required({query: 'username'})
 * @required({query: ['username','age'],params: 'id'})
 */
export function required(args: any) {
    return function(target: any, name: string, descriptor: PropertyDescriptor) {
        return requireDescriptor(target, name, descriptor, args);
    };
}

/**
 * 转换数组
 */
function sureIsArray(arr: any) {
    return Array.isArray(arr) ? arr : [arr];
}

/**
 * URL必传参数校验
 * @required({params: 'username'})
 * @required({params: ['username','age']})
 * @required({query: 'username'})
 */
function requireDescriptor(
    target: any,
    name: string,
    descriptor: PropertyDescriptor,
    rules: any
) {
    target[name] = sureIsArray(target[name]);
    target[name].splice(target[name].length - 1, 0, middleware);
    return descriptor;

    async function middleware(ctx: Koa.Context, next: any) {
        if (rules.query) {
            rules.query = sureIsArray(rules.query);
            for (let name of rules.query) {
                if (!ctx.query[name])
                    ctx.throw(412, `GET Request query: ${name} required`);
            }
        }
        if (rules.params) {
            rules.params = sureIsArray(rules.params);
            for (let name of rules.params) {
                if (!ctx.params[name])
                    ctx.throw(412, `GET Request params: ${name} required`);
            }
        }
        await next();
    }
}

//同步获取注册所有路由
export default class Route {
    private router: any;
    private app: Koa;
    constructor(app: Koa) {
        this.router = new Router();
        this.app = app;
        //注册路由
        this.registerRouters(path.resolve(__dirname, '../controller'));
    }
    /**
     * 注册路由
     * @param {String} controllerDir api文件路径
     * @memberOf Route
     */
    async registerRouters(controllerDir: string) {
        const files = this.explorer(controllerDir);
        let all: { method: string; path: string }[] = [];
        for (let file of files) {
            import(file).then(res => {
                let fileInfo = res.default;
                const {
                    config: { method, path, middleware = [] },
                    controller
                } = fileInfo;
                all.push({ method, path });
                if (middleware.length > 0) {
                    const middlewareList = this.loaderMiddleware(
                        middleware
                    );
                    this.router[method.toLowerCase()](
                        path,
                        ...middlewareList,
                        controller
                    );
                } else {
                    this.router[method.toLowerCase()](path, controller);
                }
            })
            .catch(err => {});
            this.router.get('/all', (ctx: Koa.Context) => {
                ctx.body = all;
            });
        }
        this.useRoutes();
    }
    /**
     * 加载路由
     * @param {string[]} middleware
     * @returns {Function[]} 中间件数组
     * @memberof Route
     * @returns {string[]} middleware
     */
    loaderMiddleware(middleware: string[]): Function[] {
        const middlewareList: Function[] = [];
        for (const item of middleware) {
            try {
                middlewareList.push(require(`../middleware/${item}`));
            } catch (e) {}
        }
        return middlewareList;
    }
    /**
     * 查找所有路由文件
     * @param {string} path controller路径
     * @returns {string[]}
     * @memberof Route
     */
    explorer(path: string): string[] {
        //matchBase: 设置为true以后,在当前目录下所有的文件夹和子文件夹里寻找匹配的文件
        return glob.sync(`${path}/**/*.+(js|ts)`, { matchBase: true });
    }
    /**
     * 应用路由
     * @memberof Route
     */
    useRoutes(): void {
        const router = this.router;
        router.prefix('/api');
        this.app.use(router.routes()).use(router.allowedMethods());
    }
}
