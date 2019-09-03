import Koa from 'koa';
/* GET users listing. */
import ControllerConfig from '../../@types/Controller';
class Controller{
    config: ControllerConfig = {
        method: 'GET',
        path: '/user',
        middleware: []
    };
    async controller(ctx: Koa.Context) {
     /*    const token = util.setToken({
            username: '赵鹏',
            age: 19
        });
        const encode = util.getToken(token);
        res.json(token); */
    }
}
export default new Controller();
