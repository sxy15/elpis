const path = require('path')

module.exports = app => {
    // 静态目录
    const koaStatic = require('koa-static')
    app.use(koaStatic(path.resolve(process.cwd(), './app/public')))

    // 模版渲染
    const koaNunjucks = require('koa-nunjucks-2')
    app.use(koaNunjucks({
        ext: 'tpl',
        path: path.join(process.cwd(), './app/public'),
        nunjucksConfig: {
            noCache: true,
            trimBlocks: true
        }
    }))

    // ctx.body 解析
    const bodyParser = require('koa-bodyparser')
    app.use(bodyParser({
        formLimit: '1000mb',
        enableTypes: ['json', 'form', 'text']
    }))

    // 错误处理
    app.use(app.middlewares.errorHandle)

    // API签名校验
    app.use(app.middlewares.apiSignVerify)
}
