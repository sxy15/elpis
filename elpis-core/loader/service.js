const path = require('path')
const glob = require('glob')
const { sep } = path

/**
 * service
 * app/services
 * @param {*} app koa实例
 */
module.exports = app => {
    const servicePath = path.resolve(app.businessPath, `.${sep}service`)
    const fileList = glob.sync(`**${sep}**.js`, { cwd: servicePath })

    const services = {}

    fileList.forEach(file => {
        /**
         * 提取文件名称
         * 截取路径
         * 驼峰转换
         */
        let name = file.substring(0, file.lastIndexOf('.'))
        name = name.replace(/[_-][a-z]/ig, (s) => s.substring(1).toUpperCase())

        let tempService = services
        const names = name.split(sep)
        for (let i = 0, len = names.length; i < len; i++) {
            if (i == len - 1) {
                const service = require(path.resolve(servicePath, file))(app)
                tempService[names[i]] = new service()
            } else {
                if (!tempService[names[i]]) {
                    tempService[names[i]] = {}
                }
                tempService = tempService[names[i]]
            }
        }
    })

    app.service = services
}