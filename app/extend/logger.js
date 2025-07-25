const log4js = require('log4js')

/**
 * logger.info logger.error logger.warn
 * @param {*} app 
 * @returns 
 */
module.exports = (app) => {
    let logger;

    if (app.env.isLocal()) {
        logger = console
    } else {
        log4js.configure({
            appenders: {
                console: { type: 'console' },
                dateFile: { type: 'dateFile', filename: './logs/date.log', pattern: 'yyyy-MM-dd.' }
            },
            categories: {
                default: {
                    appenders: ['console', 'dateFile'],
                    level: 'trace'
                }
            }
        })
        logger = log4js.getLogger()
    }

    return logger
}