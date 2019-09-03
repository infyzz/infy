/**
 * author: zhaopeng
 * date: 2018-01-01 21:35:37
 * @apiVersion 1.0.0
 * @apiGroup article2
 * @api {GET} /article/:id 获取文章详情
 * @apiDescription 获取文章详情
 * @apiName article_id
 * @apiParam (list) {id} id Users unique ID
 * @apiSuccess (list) {String} firstname Firstname of the User.
 * @apiSuccess (list) {String} lastname  Lastname of the User.
 * @apiSampleRequest /article/:id
 * @apiSuccessExample {json} Success-Response:
 *     HTTP2 200 OK
 *     {
 *       "firstname": "John",
 *       "lastname": "Doe"
 *     }
 */
import Koa from 'koa'
import ArticleDetailes from '../../service/article/article_detaile'
import ControllerConfig from '../../@types/Controller'
import { APIError, APIResult } from '../../model/ApiResult'
class Controller {
    config: ControllerConfig = {
        method: 'GET',
        path: '/article/:id',
        middleware: []
    }
    async controller(ctx: Koa.Context) {
        //set id
        ArticleDetailes.id = ctx.params.id
        try {
            const result = await ArticleDetailes.getDetailes()
            if (result) {
                ctx.body = new APIResult('查询成功！', 1, result)
            } else {
                ctx.body = new APIError('查询文章出错', 404)
            }
        } catch (error) {
            ctx.body = new APIError('查询文章出错')
        }
    }
}
export default new Controller()
