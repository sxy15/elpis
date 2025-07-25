const path = require('path')
const koaNunjucks = require('koa-nunjucks-2')

module.exports = app => {
    app.use(koaNunjucks({
        ext: 'tpl',
        path: path.join(process.cwd(), './app/public'),
        nunjucksConfig: {
            noCache: true,
            trimBlocks: true
        }
    }))
}