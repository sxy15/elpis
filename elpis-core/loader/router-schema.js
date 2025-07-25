const { glob } = require('glob');
const path = require('path');
const { sep } = path;

/**
 * 通过 json-schema & ajv 对 API 规则进行约束，配合 api-params-verify 中间件使用
 * @param {*} app 
 */
module.exports = app => {
    const routeSchemaPath = path.resolve(app.businessPath, `.${sep}router-schema`)
    const fileList = glob.sync(`**.js`, { cwd: routeSchemaPath })

    const routerSchema = {}

    fileList.forEach(file => {
        routerSchema = {
            ...routerSchema,
            ...require(path.resolve(file))
        }
    })

    app.routerSchema = routerSchema
}