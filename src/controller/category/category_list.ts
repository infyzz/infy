/**
* author: zhaopeng
* date: 2018-01-01 21:35:37
* @api {GET} /category/list 获取栏目列表
* @apiDescription 获取栏目列表
* @apiName category_list
* @apiSampleRequest /category/list
* @apiGroup category
* @apiVersion 1.0.0
*/
import Koa from 'koa';
import CategoryService from '../../service/category/category_list';
import ControllerConfig from '../../@types/Controller';
class Controller {
    config: ControllerConfig = {
        method: 'GET',
        path: '/category/list',
        middleware: []
    };
    async controller(ctx: Koa.Context) {
        // var a = await CategoryService.query(`source ${__dirname}/back.sql`)
        try {
            let result = await CategoryService.getCategoryList();
            ctx.body = {
                status: 1,
                data: result.length > 0 ? result : null
            };
        } catch (error) {
            ctx.body = {
                status: 0,
                msg: '查询失败'
            };
        }
    }
}
export default new Controller();
