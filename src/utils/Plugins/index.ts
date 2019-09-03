/*
 * @Author: zhaopeng
 * @Date: 2018-01-06 12:04:47
 */

import jwt from 'jwt-simple';
import request from 'superagent';
import uuid from 'uuid';
import crypto from 'crypto';
import Koa from 'koa';
import os from 'os';
const JWTSECRET: string = process.env.JWTSECRET as string;
export default class Pulgins {
    /**
     *  token加密
     * @param data object
     * @param exp  string 1天
     */
    enCodeToken(data: object, exp?: string) {
        let encodeData = {
            exp: exp || Math.floor(Date.now() / 1000) + 60 * 60 * 24,
            ...data
        };
        return jwt.encode({ ...encodeData }, JWTSECRET);
    }
    /**
     *  token解密
     * @param token string
     */
    deCodeToken(token: string) {
        return new Promise((resolve, reject) => {
            try {
                resolve(jwt.decode(token, JWTSECRET));
            } catch (err) {
                reject(err);
            }
        });
    }
    createCrypto(password: string) {
        return crypto
            .createHash('sha1')
            .update(password)
            .digest('hex');
    }
    /**
     * @description 比较密码是否一致
     * @param {string} password 密码
     * @param {string} resPassword 加密密码
     * @returns 返回true or false
     */
    checkCrypto(password: string, resPassword: string) {
        return resPassword == this.createCrypto(password);
    }
    /**
     * 获取客户端本地IP
     */

    getLocalIp = () => {
        const interfaces = os.networkInterfaces();
        for (const devName in interfaces) {
            var iface = interfaces[devName];
            let ip = null;
            for (var i = 0; i < iface.length; i++) {
                var alias = iface[i];
                if (
                    alias.family === 'IPv4' &&
                    alias.address !== '127.0.0.1' &&
                    !alias.internal
                ) {
                    ip = alias.address;
                    break;
                }
            }
            return ip;
        }
    };

    /**
     * 获取客户端公网IP
     * @returns {Object} ip,location
     */
    getClientIp = async () => {
        const url = 'http://ip.360.cn/IPShare/info';
        try {
            const result: any = await request.get(url);
            // charset('utf-8')
            if (!result.ok) return null;
            return {
                ip: result.ip,
                location: result.location
            };
        } catch (error) {
            return null;
        }
    };

    /**
     * 生成uuid
     */
    getUuid = (): string => uuid().replace(/-/g, '');

    getClientInfo = (ctx: Koa.Context) => ctx.headers['user-agent'];

    /**
     * 判断对象上是否有改属性
     * @param {Object} obj
     * @param {String} prop
     * @returns {Boolean}
     */
    hasOwn = (obj: object, prop: string): boolean =>
        Object.prototype.hasOwnProperty.call(obj, prop);
}
