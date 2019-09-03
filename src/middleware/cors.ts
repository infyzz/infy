/*
  * @Author: zhaopeng
 * @Date: 2018-01-21 19:10:26
 * 跨域中间件
 */
import {Context} from 'koa'
export default async (ctx:Context, next:Function) => {
	ctx.set({
		'Access-Control-Allow-Methods': 'OPTIONS,HEAD,DELETE,GET,PUT,POST', //支持跨域的方法
		'Access-Control-Allow-Headers': '*', //允许的头
		'Access-Control-Max-Age': '10000', // 预检请求缓存时间
		// 如果服务器设置Access-Control-Allow-Credentials为true，那么就不能再设置Access-Control-Allow-Origin为*,必须用具体的域名
		// 'Access-Control-Allow-Credentials': true // 跨域请求携带身份信息(Credential，例如Cookie或者HTTP认证信息)
	});
    await next();
};
