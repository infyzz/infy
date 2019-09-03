/**
 * author: zhaopeng
 * date: 2018-01-01 21:35:37
 * @api {POST} /article 添加文章
 * @apiDescription 添加文章接口
 * @apiName article_add
 * @apiParam (list) {string{5..25}} [title] 文章标题
 * @apiParam (list) {string{5..}} [content] 文章内容
 * @apiSampleRequest /article
 * @apiHeader {String} [token] 用户token.
 * @apiGroup article
 * @apiVersion 1.0.0
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/2 200 OK
 *    {
 *      "firstname": "John",
 *      "lastname": "Doe"
 *    }
 */

import MyContext from '../../@types/Context';
import ArticleAddService from '../../service/article/article_add';
import ControllerConfig from '../../@types/Controller';
import { APIError, APIResult } from '../../model/ApiResult';

class Controller {
    config: ControllerConfig = {
        method: 'POST',
        path: '/article/add',
        middleware: ['authMiddleware']
    };
    async controller(ctx: MyContext) {
        /* * * * * * * * * * * * * * * * * * * * *
         *   categoryId
         *   类目Id 不传自动进入未分类
         *   tags 栏目标签
         *  * * * * * * * * * * * * * * * * * * * */
        let params = ctx.request.body;
        //@ts-ignore
        ArticleAddService.setUid(ctx.uid)

        ctx.body = new APIResult('发布成功！');
        //验证发布内容
        const result = ArticleAddService.checkData(params);
        if (result) {
            // 存储tag到数据库
            let tagIds = await ArticleAddService.saveTags(
                params.tags
            );
            params.tags = tagIds.join();
            //存储文章到数据库

            ArticleAddService.saveArticle(params)
                .then(res => {
                    ctx.body = new APIResult('发布成功！');
                })
                .catch(err => {
                    new APIError(err, 500);
                });
        } else {
            ctx.body = result;
        }
    }
}
export default new Controller();
