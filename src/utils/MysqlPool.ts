import mysql ,{PoolConfig} from 'mysql';
import { Tracer } from 'tracer';
import MysqlPoolInterface, { countOption } from '../@types/MysqlPool';
import { logger } from '../utils';
const { DB_HOST, DB_PORT, DB_PASSWORD, DB_DATABASE, DB_USER, DB_CONNRCTION_LIMIT } = process.env
class MysqlPool implements MysqlPoolInterface {
    logger: Tracer.Logger;
    pool: mysql.Pool;
    constructor() {
        this.logger = logger;
        let PoolConfig = {
            host: DB_HOST,
            password: DB_PASSWORD,
            database: DB_DATABASE,
            user: DB_USER,
            connectionLimit: Number(DB_CONNRCTION_LIMIT),
            port: Number(DB_PORT)
        };
        this.pool = mysql.createPool(PoolConfig);
    }
    /**
     * @description 返回sql语句
     * */
    format(sql: string, values: any[]): string {
        let sqlStr: string = mysql.format(sql, values);
        return sqlStr;
    }
    query(query: string, values: any = null) {
        if (process.env.NODE_ENV === 'development') {
            const sql = this.format(query, values);
            this.logger.info(sql);
        }
        return new Promise((resolve, reject) => {
            this.pool.query(query, values, (error: any, results: any) => {
                if (error) reject(error);
                resolve(results);
            });
        });
    }
    async count(table:string, option?: countOption): Promise<any> {
        let key: string | null = '*';
        let query = `SELECT COUNT(${key}) FROM ${table}`;
        let condition = null
        if(option){
            key = option.key || '*'
            if (option.condition) {
                query = query + ' WHERE ?';
                condition = option.condition
            }
        }
        let result: any = await this.query(query, condition);
        return result[0][`COUNT(${key})`];
    }
    /**
     * @param  [Array | string] column 列
     * */
    find({
        column = '*',
        table,
        obj = null
    }: {
        column: string;
        table: string;
        obj: any;
    }) {
        let query = `SELECT ?? FROM ${table}`;
        if (obj) {
            query = query + ' WHERE ?';
        }
        return this.query(query, obj);
    }
    async findOne(table: string, obj = {}) {
        let query = `SELECT * FROM ${table} WHERE ? LIMIT 0,1`;
        // @ts-ignore
        let [data] = await this.query(query, obj);
        return data || null;
    }
    async update(table: any, row: any, key: any) {
        let query = `UPDATE ${table} SET  ? WHERE ?`;
        return this.query(query, [row, key]);
    }
    async insert(table: any, obj = {}) {
        let keys = Object.keys(obj).join(',');
        let values = Object.values(obj);
        let query = `INSERT INTO ${table}(${keys}) VALUES(?)`;
        // @ts-ignore
        const { affectedRows } = await this.query(query, [values]);
        return affectedRows === 1;
    }
    async delete(table: any, key: any) {
        let query = `DELETE FROM ${table} WHERE ?`;
        return await this.query(query, [key]);
    }
}
export default MysqlPool;
