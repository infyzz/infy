/**
 * author: zhaopeng
 * date: 2018-01-01 21:35:37
 * @api {GET} /article/list 获取文章列表
 * @apiDescription 获取文章列表
 * @apiName article_list
 * @apiParam (list) {Number{0..10}} [page=1] 默认为1
 * @apiParam (list) {Number{2-10}} [pagenum=10] 默认为10
 * @apiPermission admin
 * @apiSampleRequest /article/list
 * @apiGroup article
 * @apiVersion 1.0.0
 */
import Koa from 'koa';
import ArticleListServeice from '../../service/article/article_list';
import ControllerConfig from '../../@types/Controller';
class Controller{
    config: ControllerConfig = {
        method: 'GET',
        path: '/article',
        middleware: []
    };
    async controller(ctx: Koa.Context) {
        //获取分页信息
        let { page, pageNum } = ctx.query;
        page = parseInt(page) || 1;

        const limit = parseInt(pageNum) || 10;
        const skip = (page - 1) * limit;

        //启动数据库
        let { data, count } = await ArticleListServeice.getList(skip, limit);
        ctx.body = {
            status: 1,
            count,
            data
        };
    }
}
export default new Controller();
