/*
 * @Author: zhaopeng
 * @Date: 2019-02-26 19:10:26
 * 跨域中间件
 */
import Koa from 'koa';
import Pulgins from '../utils/Plugins';
import monent, { Moment } from 'moment';
import { Tracer } from 'tracer';
import validator from 'validator';
const { logger, MysqlPool } = require('../utils');
import app from '../../app';
import MysqlPoolInterface from '../@types/MysqlPool';
export default class Service {
    plugins: Pulgins;
    validator: any;
    db: MysqlPoolInterface;
    monent: any;
    logger: Tracer.Logger;
    app: Koa;
    constructor() {
        this.app = app;
        this.plugins = new Pulgins();
        this.validator = validator;
        this.db = new MysqlPool();
        monent.locale('zh-cn');
        this.monent = monent;
        this.logger = logger;
    }
}
