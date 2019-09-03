/**
* author: zhaopeng
* date: 2018-10-18 14:11:22
* @api {POST} /api/user_login 添加文章
* @apiDescription 用户登录
* @apiName user_login
* @apiParam (list) {string} [username] 用户名
* @apiParam (list) {string} [password] 密码
* @apiSampleRequest /user_login
* @apiGroup user
* @apiVersion 1.0.0
* @apiSuccessExample {json} Success-Response:
*    HTTP/2 200 OK
* {
*    "status": 1,
*    "msg": "登录成功！",
*    "data": {
*        "uid": "e69846d4d8e644e2a8951d5b430e3a6d",
*        "username": "zhaopeng",
*        "password": "1eaa2d628c29f42d385c1eff77d67835821c7f08",
*        "email": "712733712@qq.com",
*        "client_ip": null,
*        "location": null,
*        "is_admin": 0,
*        "create_time": "2019-07-01T13:14:47.000Z",
*        "update_time": "2019-07-01T13:14:47.000Z",
*        "client_info": "PostmanRuntime/7.13.0",
*        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NjIzMzEyMjUsInVpZCI6ImU2OTg0NmQ0ZDhlNjQ0ZTJhODk1MWQ1YjQzMGUzYTZkIn0.qQb1LjwSnU7yWEHQT49qbY9DEvyZAOnFoLkya-v5fqk"
*    }
*}
*/

import Koa from 'koa';
import validator from 'validator';
import UserLoginServeice from '../../service/user/user_login';
import ControllerConfig from '../../@types/Controller';
import { APIResult, APIError } from '../../model/ApiResult';
import UserLoginModel from '../../model/UserLoginModel';
class Controller {
    config: ControllerConfig = {
        method: 'POST',
        path: '/user/login',
        middleware: []
    };
    async controller(ctx: Koa.Context) {
        const { username, password } = ctx.request.body;
        if (username && password) {
            if (validator.isEmpty(username) || validator.isEmpty(password)) {
                ctx.body = new APIError('用户名或密码不能为空！', 401);
            }
            try {
                const result = await UserLoginServeice.checkUserLogin(
                    username,
                    password
                );
                ctx.body = new APIResult('登录成功！', 1, new UserLoginModel(result));
            } catch (error) {
                ctx.body = new APIError('用户名或密码错误！', 401);
            }
        } else {
            ctx.body = new APIError('用户名或密码不能为空！', 401);
        }
    }
}
export default new Controller();
