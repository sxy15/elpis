/**
 * API签名合法性校验
 * @param {object} app koa 实例 
 */

const md5 = require("md5");

module.exports = (app) => {
    return async (ctx, next) => {
        //只对 API 请求做签名校验
        if (ctx.path.indexOf('/api') < 0) {
            return await next();
        }
        const { path, method } = ctx;
        const { headers } = ctx.request;
        const { s_sign: sSign, s_t: st } = headers

        const signKey = "sxyanfu19921115"
        const signature = md5(`${signKey}_${st}`)
        app.logger.info(`[${method} ${path}] signature:`, signature)

        if (!sSign || !st || signature !== sSign.toLowerCase() || Date.now() - st > 10000) {
            ctx.status = 200;
            ctx.body = {
                success: false,
                message: 'signature not correct or timeout !!',
                code: 445
            }
            return
        }
        await next();
    }
}