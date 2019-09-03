/**
 * author: zhaopeng
 * date: 2018-01-01 21:35:37
 * @api {POST} /public/upload/list 获取上传列表
 * @apiDescription 获取上传列表
 * @apiName upload
 * @apiPermission admin
 * @apiSampleRequest /public/upload/list
 * @apiGroup public
 * @apiVersion 1.0.0
 */

import Koa from 'koa';
import ControllerConfig from '../../@types/Controller';
import UploadListService from '../../service/public/upload_list';
import { APIError, APIResult } from '../../model/ApiResult';
import UploadListModel from '../../model/UploadListModel';
class Controller {
    config: ControllerConfig = {
        method: 'GET',
        path: '/public/upload',
        middleware: ['authMiddleware']
    };
    async controller(ctx: Koa.Context) {
        UploadListService.setUid(ctx.uid)
        const result = await UploadListService.getUploadList(1)
        ctx.body = new APIResult(
            '请求成功！',
            1,
            result.map((item: any) => new UploadListModel(item))
        );
    }
}
export default new Controller();
