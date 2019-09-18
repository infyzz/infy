import path from 'path';
import './src/utils/Env';

const buildDir: string =
    process.env.NODE_ENV === 'development'
        ? path.join(__dirname, './client/nuxt-dist')
        : path.join(__dirname, './client/nuxt-build');

console.log({buildDir});

export default {
    buildModules: [
        [
            '@nuxt/typescript-build',
            {
                typeCheck: true,
                ignoreNotFoundWarnings: true
            }
        ]
    ],
    loadingIndicator: {
        name: 'circle',
        color: '#3B8070',
        background: 'white'
    },
    transition: {
        name: 'fade',
        mode: 'out-in'
    },
    dev: process.env.NODE_ENV === 'development',
    buildDir: buildDir,
    srcDir: 'client/',
    head: {
        title: '昔年博客-Infy',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'description',
                content: '昔年博客，个人博客网站'
            }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            {
                rel: 'stylesheet',
                href: '//at.alicdn.com/t/font_808142_dg9ywno2v4.css'
            }
        ]
    },
    css: ['~/assets/style.scss'],
    loading: { color: '#3B8070' },
    performance: {
        gzip: false
    },
    plugins: [
        { src: '~plugins/vueFunctionApi', ssr: true },
        { src: '~plugins/axios', ssr: true },
        { src: '~plugins/tongji', ssr: false }
    ],
    modules: ['@nuxtjs/axios'],
    axios: {
        proxy: true,
        retry: { retries: 3 },
        debug: false
    },
    build: {
        publicPath: '/app/',
        extractCSS: true
        // extend(config, { isDev, isServer, isClient }) {
        //     if (isDev) {
        //         config.devtool = 'eval-source-map';
        //         // config.module.rules.push({
        //         //   enforce: 'pre',
        //         //   test: /\.(js|vue)$/,
        //         //   loader: 'eslint-loader',
        //         //   exclude: /(node_modules)/
        //         // })
        //     }
        // }
    }
};
