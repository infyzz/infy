/**
 * author: zhaopeng
 * date: 2018-01-01 21:35:37
 * @api {POST} /article/:id 文章评论
 * @apiDescription 文章评论接口
 * @apiName article_comment
 * @apiParam (list) {Number} id Users unique ID
 * @apiSuccess (list) {String} firstname Firstname of the User.
 * @apiSuccess (list) {String} lastname  Lastname of the User.
 * @apiSampleRequest /article/:id
 * @apiGroup article2
 * @apiVersion 1.0.0
 * @apiHeader {String} [token] true Users unique access-key.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "firstname": "John",
 *       "lastname": "Doe"
 *     }
 */
import Koa from 'koa';
import validator from 'validator';
import ControllerConfig from '../../@types/Controller';
class Controller {
    config: ControllerConfig = {
        method: 'GET',
        path: '/article/comment',
        middleware: []
    };
    async controller(ctx: Koa.Context) {
        let { id } = ctx.params;
        // if (validator.isMongoId(id)) {
        //     try {
        //         let result = await Article.findById(id);
        //         if (result) {
        //             res.json({
        //                 status: 1,
        //                 data: result
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
};
export default new Controller();
