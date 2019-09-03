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
import ArticleTagsServeice from '../../service/article/article_tags'
import ControllerConfig from '../../@types/Controller'
class Controller {
    config: ControllerConfig = {
        method: 'GET',
        path: '/tags',
        middleware: []
    }
    async controller(ctx: Koa.Context) {
        //获取分页信息
        //启动数据库
        let { data, count } = await ArticleTagsServeice.getList()
        ctx.body = {
            status: 1,
            count,
            data
        }
    }
}
export default new Controller()
