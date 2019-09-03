/**
 * author: zhaopeng
 * date: 2018-01-01 21:35:37
 * @api {POST} /public/upload 获取文章列表
 * @apiDescription 获取文章列表
 * @apiName upload
 * @apiPermission admin
 * @apiSampleRequest /public/upload
 * @apiGroup public
 * @apiVersion 1.0.0
 */

import Koa from 'koa';
import UploadServeice from '../../service/public/upload';
import ControllerConfig from '../../@types/Controller';
import { APIError, APIResult } from '../../model/ApiResult';
class Controller {
    config: ControllerConfig = {
        method: 'POST',
        path: '/public/upload',
        middleware: ['authMiddleware']
    };
    async controller(ctx: Koa.Context) {
        //@ts-ignore
        let files = ctx.request.files.file;
        /* 设置上传的用户id */
        UploadServeice.setUid(ctx.uid);
        /* 上传文件的路径 ArrayList */
        UploadServeice.setUploadpath(ctx.uploadpath);
        /* 上传文件的文件 ArrayList */
        UploadServeice.setFiles(files);
        /* 上传文件到七牛 */
        await UploadServeice.upToQiniu();
        /* 保存记录到数据库 */
        try {
            const result = await UploadServeice.saveFile();
            ctx.body = new APIResult('上传成功！', 1, result);
        } catch (error) {
            UploadServeice.logger.error(error);
            ctx.body = new APIError('上传失败', 0);
        }
    }
};
export default new Controller();
