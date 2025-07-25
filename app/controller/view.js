module.exports = (app) => {
    return class ViewController {
        async renderPage(ctx) {
            await ctx.render(`output/entry.${ctx.params.page}`, {
                title: app.options?.name,
                options: JSON.stringify(app.options)
            })
        }
    }
}