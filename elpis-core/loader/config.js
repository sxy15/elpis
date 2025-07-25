const path = require('path')
const { sep } = path

/**
 * 配置区分环境
 * @param {*} app 
 */
module.exports = app => {
    const configPath = path.resolve(app.baseDir, `.${sep}config`)
    let defaultConfig = {}

    try {
        defaultConfig = require(path.resolve(configPath, `.${sep}config.default.js`))
    } catch (e) {
        console.log(e)
    }

    let envConfig = {}
    try {
        envConfig = require(path.resolve(configPath, `.${sep}config.${app.env.get()}.js`))
    } catch (e) {
        console.log(e)
    }

    app.config = Object.assign({}, defaultConfig, envConfig)
}