import Koa from 'koa';
import koaBody from 'koa-body';
import path from 'path';
import koaStatic from 'koa-static';
import { logger } from '../utils';
import {
    getUploadFileExt,
    getUploadFileName,
    getUploadDirName,
    checkDirExist
} from '../utils/Upload';
import { APIError } from '../model/ApiResult';

const uploadDir = path.join(__dirname, '../public/upload/');
export default class InitMiddleware {
    app: Koa;
    constructor(app: Koa) {
        this.app = app;
        this.init();
    }
    init() {
        this.app.use(
            koaBody({
                multipart: true, // 支持文件上传
                formidable: {
                    uploadDir, // 设置文件上传目录
                    keepExtensions: true, // 保持文件的后缀
                    maxFieldsSize: 2 * 1024 * 1024, // 文件上传大小
                    onFileBegin: (name, file) => {
                        // 获取文件后缀
                        const ext = getUploadFileExt(file.name);
                        // 最终要保存到的文件夹目录
                        const dirName = getUploadDirName();
                        const dir = path.join(
                            __dirname,
                            `../public/upload/${dirName}`
                        );
                        // 检查文件夹是否存在如果不存在则新建文件夹
                        checkDirExist(dir);
                        // 获取文件名称
                        const fileName = getUploadFileName(ext);
                        // 重新覆盖 file.path 属性
                        file.path = `${dir}/${fileName}`;
                        this.app.context.uploadpath = [];
                        this.app.context.uploadpath.push(
                            `${dirName}/${fileName}`
                        );
                    }
                }
            })
        );
        // 继续触发error事件
        this.app.on("error", err => {
            console.error("server error", err.message);
            throw err;
        });
        this.app.use(koaStatic(uploadDir));
        this.app.use(async (ctx: Koa.Context, next: Function) => {
            try {
                await next();
            } catch (err) {
                logger.error(ctx.method, ctx.url);
                ctx.status = err.statusCode || err.status || 500;
                ctx.body = new APIError(err, ctx.status);
            }
        });
    }
}
