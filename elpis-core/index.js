const Koa = require('koa')
const path = require('path')
const env = require('./env')

const middlewareLoader = require('./loader/middleware')
const routerLoader = require('./loader/router')
const routerSchemaLoader = require('./loader/router-schema')
const controllerLoader = require('./loader/controller')
const serviceLoader = require('./loader/service')
const configLoader = require('./loader/config')
const extendLoader = require('./loader/extend')

const { sep } = path //兼容不同操作系统的/

module.exports = {
    start(options = {}) {
        const app = new Koa()

        app.options = options

        app.baseDir = process.cwd()
        app.businessPath = path.resolve(app.baseDir, `.${sep}app`)

        app.env = env()

        // 加载中间件
        middlewareLoader(app)
        console.log('middleware done')
        // 加载路由模式
        routerSchemaLoader(app)
        // 加载控制器
        controllerLoader(app)
        // 加载服务
        serviceLoader(app)
        // 加载配置
        configLoader(app)
        // 加载扩展
        extendLoader(app)
        // 注册全局中间件
        require(`${app.businessPath}${sep}middleware.js`)(app)
        // 加载路由
        routerLoader(app)

        const port = process.env.PORT || 8080
        const host = process.env.HOST || '0.0.0.0'

        app.listen(port, host, () => {
            console.log(`Server is running on http://${host}:${port}`)
            console.log(app.options, app.baseDir, app.businessPath, app.env.get())
        })
    }
}