import { Tracer } from 'tracer';
import mysql from 'mysql';
export default interface MysqlPoolInterface {
    logger: Tracer.Logger;

    pool: mysql.Pool;

    format(sql: string, values: any[]): string;

    insert(table: string, obj: {}): Promise<boolean>;

    query(query: string, values: any): Promise<any>;

    findOne(table: string, obj: {}): object | null;

    count(table: string, option?: countOption): Promise<any>;

    find(obj: { column?: string; table: string; obj?: any }): any;
}
export interface countOption {
    condition?: object;
    key?: string;
}
