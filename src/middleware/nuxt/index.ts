const { Nuxt, Builder } = require("nuxt");
//@ts-nocheck
import config from '../../../nuxt.config';
const isProd = process.env.NODE_ENV === "production";
import Koa from 'koa'
async function nuxt(app:Koa) {
    // Build in development
    const nuxt = new Nuxt(config);
    if (isProd) {
        await nuxt.ready();
    } else {
        const builder = new Builder(nuxt);
        await builder.build();
    }
    app.use((ctx: Koa.Context) => {
        ctx.status = 200;
        ctx.respond = false; // Bypass Koa's built-in response handling
        nuxt.render(ctx.req, ctx.res);
    });
}

export default nuxt;
