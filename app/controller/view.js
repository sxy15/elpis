module.exports = () => {
    return class ViewController {
        async renderPage(ctx) {
            await ctx.render(`output/entry.${ctx.params.page}`)
        }
    }
}