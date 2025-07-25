module.exports = (app) => {
    return class ViewController {
        async renderPage(ctx) {
            await ctx.render(`dist/${ctx.params.page}`, {
                title: app.options?.name,
                options: JSON.stringify(app.options)
            })
        }
    }
}