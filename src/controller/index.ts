import fs from 'fs';
import path from 'path';
import Koa from 'koa';
import ControllerConfig from '../@types/Controller';
class Controller {
    config: ControllerConfig = {
        method: 'GET',
        path: '/',
        middleware: []
    };
    async controller(ctx: Koa.Context): Promise<void> {
        const data = JSON.parse(
            fs.readFileSync(
                path.resolve(__dirname, '../dist/api_data.json'),
                'utf8'
            )
        );
        ctx.body = {
            status: 1,
            data
        };
    }
}
export default new Controller();
