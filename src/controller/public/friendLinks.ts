/**
 * author: zhaopeng
 * date: 2018-01-01 21:35:37
 * @api {GET} /tags 获取文章列表
 * @apiDescription 获取文章列表
 * @apiName article_tags
 * @apiSampleRequest /article/tags
 * @apiGroup article
 * @apiVersion 1.0.0
 */
import Koa from 'koa'
import FriendLinksServeice from '../../service/public/friendlinks'
import ControllerConfig from '../../@types/Controller'
import { APIResult } from '../../model/ApiResult';
class Controller {
    config: ControllerConfig = {
        method: 'GET',
        path: '/public/friendLinks',
        middleware: []
    }
    async controller(ctx: Koa.Context) {
        //启动数据库
        let { data } = await FriendLinksServeice.getList()
        ctx.body = new APIResult('成功！', 1, data)
    }
}
export default new Controller()
