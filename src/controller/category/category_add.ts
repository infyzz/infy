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
// const CategoryService = require('../../service/category/category_add')
import ControllerConfig from '../../@types/Controller';
class Controller{
    config: ControllerConfig = {
        method: 'GET',
        path: '/category/add',
        middleware: ['authMiddleware']
    };
    async controller(ctx: Koa.Context) {
        /* let { title, name } = req.body;
        try {
            let result = await CategoryService.findOne({
                title,
                name
            });
            if (result) {
                return res.json({
                    status: 0,
                    msg: '该类目已存在！'
                });
            }
            let addResult = await Category.create({
                title,
                name
            });
            res.json({
                status: 1,
                data: '添加成功'
            });
        } catch (error) {
            res.json({
                status: 0,
                msg: '新增失败'
            });
        } */
    }
}
export default new Controller();
