const path = require('path')
const glob = require('glob')
const { sep } = path

/**
 * middleware
 * app/middlewares
 * @param {*} app koa实例
 */
module.exports = app => {
    const middlewarePath = path.resolve(app.businessPath, `.${sep}middleware`)
    const fileList = glob.sync(`**${sep}**.js`, { cwd: middlewarePath })

    const middlewares = {}

    fileList.forEach(file => {
        /**
         * 提取文件名称
         * 截取路径
         * 驼峰转换
         */
        let name = file.substring(0, file.lastIndexOf('.'))
        name = name.replace(/[_-][a-z]/ig, (s) => s.substring(1).toUpperCase())

        let tempMiddleware = middlewares
        const names = name.split(sep)
        for (let i = 0, len = names.length; i < len; i++) {
            if (i == len - 1) {
                tempMiddleware[names[i]] = require(path.resolve(middlewarePath, file))(app)
            } else {
                if (!tempMiddleware[names[i]]) {
                    tempMiddleware[names[i]] = {}
                }
                tempMiddleware = tempMiddleware[names[i]]
            }
        }
    })

    app.middlewares = middlewares
}