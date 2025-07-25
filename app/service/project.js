module.exports = app => {
    const BaseService = require('./base')(app);

    return class projectService extends BaseService {
        async getList() {
            return [
                {
                    name: '智能机器人',
                    desc: '机器人项目'
                },
                {
                    name: '可视化低代码',
                    desc: '低代码项目'
                }
            ]
        }

        async add(ctx) {
            const { name, desc } = ctx.request.body
            return {
                name,
                desc
            }
        }
    }
}