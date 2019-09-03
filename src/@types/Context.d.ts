import { Context } from 'koa';
// Koa.Context
export default interface MyContext extends Context {
    uid?: string;
}
