const path = require('path')
const glob = require('glob')
const { sep } = path

/**
 * controller
 * app/controllers
 * @param {*} app koa实例
 */
module.exports = app => {
    const controllerPath = path.resolve(app.businessPath, `.${sep}controller`)
    const fileList = glob.sync(`**${sep}**.js`, { cwd: controllerPath })

    const controllers = {}

    fileList.forEach(file => {
        /**
         * 提取文件名称
         * 截取路径
         * 驼峰转换
         */
        let name = file.substring(0, file.lastIndexOf('.'))
        name = name.replace(/[_-][a-z]/ig, (s) => s.substring(1).toUpperCase())

        let tempController = controllers
        const names = name.split(sep)
        for (let i = 0, len = names.length; i < len; i++) {
            if (i == len - 1) {
                const Controller = require(path.resolve(controllerPath, file))(app)
                tempController[names[i]] = new Controller()
            } else {
                if (!tempController[names[i]]) {
                    tempController[names[i]] = {}
                }
                tempController = tempController[names[i]]
            }
        }
    })

    app.controllers = controllers
}