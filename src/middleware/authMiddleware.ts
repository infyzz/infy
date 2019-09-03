import { Context } from 'koa';
/*
 * @Author: zhaopeng
 * @Date: 2018-01-21 19:10:26
 * 身份验证中间件
 */
import Plugins from '../utils/Plugins';
import { APIError } from '../model/ApiResult';
import MyContext from '../@types/Context';
const plugins = new Plugins();
module.exports = async (ctx: MyContext, next: Function) => {
    try {
        const token = ctx.headers.token || null;
        if (token) {
            const { uid, exp }: any = await plugins.deCodeToken(token);
            const nowTime = Date.now();
            //判断token时间是否过期
            if (Number(nowTime) - Number(exp) > 0) {
                ctx.uid = uid;
                await next();
            } else {
                ctx.body = new APIError('身份验证失败,请重新登录', 401);
            }
        } else {
            ctx.body = new APIError('暂无权限', 401);
        }
    } catch (error) {
        ctx.body = new APIError('身份验证失败,请重新登录', 401);
    }
};
