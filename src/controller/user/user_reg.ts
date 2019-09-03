/**
* author: zhaopeng
* date: 2018-10-18 14:11:22
* @api {POST} /api/user_reg 添加文章
* @apiDescription 添加文章接口
* @apiName user_reg
* @apiParam (list) {string{5..25}} [title] 文章标题
* @apiParam (list) {string{5..}} [content] 文章内容
* @apiSampleRequest /user_reg
* @apiHeader {String} [token] 用户token.
* @apiGroup user
* @apiVersion 1.0.0
* @apiSuccessExample {json} Success-Response:
*    HTTP/2 200 OK
*    {
*      "msg": "登录成功",
*      "status": 1,
        "token":"xxxxxx"
*    }
*/

import Koa from 'koa';
import UserRegService from '../../service/user/user_reg';
import ControllerConfig from '../../@types/Controller';
class Controller{
    config: ControllerConfig = {
        method: 'POST',
        path: '/user/reg',
        middleware: []
    };
    async controller(ctx: Koa.Context) {
        const status = {
            0: '该用户名已存在!',
            1: '注册成功',
            3: '注册失败'
        };
        let { username, password, email } = ctx.request.body;
        if (username && password) {
            /* 数据库连接开始 */
            const isReg = await UserRegService.isReg(username);
            if (isReg) {
                ctx.body = { status: 0, msg: status[0] };
            } else {
                const client_info = UserRegService.plugins.getClientInfo(ctx);
                try {
                    let result = await UserRegService.userReg(
                        username,
                        password,
                        email,
                        client_info
                    );
                    console.log(result);
                    if (result) {
                        ctx.body = { status: 1, msg: status[1] };
                    } else {
                        ctx.body = { status: 3, msg: status[3] };
                    }
                } catch (error) {
                    console.log(error);
                    ctx.body = { status: 3, msg: status[3] };
                }
            }
        } else {
            ctx.body = { status: 0, msg: '用户名或密码不能为空!' };
        }
    }
};
export default new Controller();
