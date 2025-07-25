module.exports = (app) => {
    const BaseController = require('./base')(app)

    return class ProjectController extends BaseController {

        async getList(ctx) {
            const { project: projectService } = app.service

            const res = await projectService.getList()
            app.logger.info(res)
            this.success(ctx, res)
        }

        async add(ctx) {
            const { project: projectService } = app.service

            const res = await projectService.add(ctx)
            this.success(ctx, res)
        }
    }
}