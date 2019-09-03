> blog description [GitHub链接](https://github.com/zhaopeng95/Infy)

- Controller 自动注册功能
- restfull Api 风格
- jwt 身份验证
- vue ssr 服务端渲染
- 自动生成 api 文档
- typescript

### 本地运行
1. `$ git clone https://github.com/zhaopeng95/Infy.git`
2. `$ npm i`
3. 复制 config下的.env.development 到项目根目录
`$ cp config/.env.development .env.development`
配置文件开发环境为 .env.development
生产环境为 .env.production
4. 修改.env.development 文件中的一些常用配置项目
5. `$ npm run start`

### 线上运行
1. `$ npm run build`
2. `$ cp -R client dist/client/`
3. 复制 .env.development 改名为 .env.production 配置服务端环境变量 `cp config/.env.development .env.production`
4. 修改.env.production 文件中的一些常用配置项目
5. 上传dist目录中所有的文件到服务器进行部署（可使用pm2 ssh自动化部署）
6. 最后用pm2启动项目即可