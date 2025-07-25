const path = require('path')
const glob = require('glob')
const { sep } = path

/**
 * extend
 * app/extend
 * @param {*} app koa实例
 */
module.exports = app => {
    const extendPath = path.resolve(app.businessPath, `.${sep}extend`)
    const fileList = glob.sync(`**${sep}**.js`, { cwd: extendPath })

    fileList.forEach(file => {
        /**
         * 提取文件名称
         * 截取路径
         * 驼峰转换
         */
        let name = file.substring(0, file.lastIndexOf('.'))
        name = name.replace(/[_-][a-z]/ig, (s) => s.substring(1).toUpperCase())

        // 过滤app已经存在的key
        for (const key in app) {
            if (key === name) {
                return
            }
        }

        app[name] = require(path.resolve(extendPath, file))(app)

    })
}