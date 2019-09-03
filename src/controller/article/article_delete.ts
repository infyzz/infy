/**
* author: zhaopeng
* date: 2018-01-01 21:35:37
* @api {DELETE} /article/:id 删除文章
* @apiDescription 删除文章
* @apiName article_delete
* @apiParam (list) {Number} id Users unique ID
* @apiSuccess (list) {String} firstname Firstname of the User.
* @apiSuccess (list) {String} lastname  Lastname of the User.
* @apiSampleRequest /article/:id
* @apiGroup article2
* @apiVersion 1.0.0
* @apiHeader {String} [token] 用户token.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "firstname": "John",
 *       "lastname": "Doe"
 *     }
 */

import validator from 'validator';
import Koa from 'koa';
// import ArticleDelete from '../../service/article/article_delete';
import ControllerConfig from '../../@types/Controller';
class Controller{
    config: ControllerConfig = {
        method: 'GET',
        path: '/article/comment',
        middleware: []
    };
    async controller(ctx: Koa.Context) {
        // const { id } = ctx.request.body;
        // if (validator.isUUID(id)) {
        //     try {
        //         let result = await this.db.deleteOne({ _id: id });
        //         if (result && result.deletedCount > 0) {
        //             res.json({
        //                 status: 1,
        //                 msg: '文章删除成功'
        //             });
        //         } else {
        //             res.json({
        //                 status: 0,
        //                 msg: '文章不存在或已经删除'
        //             });
        //         }
        //     } catch (error) {
        //         res.json({
        //             status: 0,
        //             error
        //         });
        //     }
        // } else {
        //     res.json({
        //         status: 0,
        //         message: 'id不正确'
        //     });
        // }
    }
}
export default new Controller();
