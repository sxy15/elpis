module.exports = (app, router) => {
    const { view: viewController } = app.controller

    // http://localhost:8080/view/page1
    router.get('/view/:page', viewController.renderPage.bind(viewController))
}