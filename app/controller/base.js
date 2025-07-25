module.exports = app => {
    /**
     * baseController
     */
    return class BaseController {
        constructor() {
            this.app = app
            this.config = app.config
        }

        success(ctx, data = {}, metadata = {}) {
            ctx.status = 200
            ctx.body = {
                success: true,
                retcode: 0,
                data,
                metadata
            }
        }

        fail(ctx, message, retcode) {
            ctx.body = {
                success: false,
                message,
                retcode
            }
        }
    }
}