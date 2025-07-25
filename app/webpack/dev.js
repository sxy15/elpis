// 本地开发启动 devServer
const express = require('express')
const path = require('path')
const webpack = require('webpack');
const divMiddleware = require('webpack-dev-middleware')
const hotMiddleware = require('webpack-hot-middleware')
const cors = require('cors')

const app = express();

// 从 webpack.dev.js 获取 webpackConfig 和 devServer 配置
const {
    webpackConfig,
    DEV_SERVER_CONFIG
} = require('./config/webpack.dev.js')

const compiler = webpack(webpackConfig)

// 指定静态文件目录
app.use(express.static(path.join(__dirname, '../public/dist')))

app.use(cors({
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control']
}))

// 引用 divMiddleware 中间件 （监控文件改动）
app.use(divMiddleware(compiler, {
    // 落地文件
    writeToDisk: (filePath) => filePath.endsWith('html'),
    // 资源路径
    publicPath: webpackConfig.output.publicPath,
    // headers 配置
    headers: DEV_SERVER_CONFIG.headers,
    stats: {
        colors: true
    }
}))
// 引用 hotMiddleware 中间件 （实现热更新通讯）
app.use(hotMiddleware(compiler, {
    path: `/${DEV_SERVER_CONFIG.HMR_PATH}`,
    log: () => { }
}))

console.info(' --- 请等待webpack初次构建 ---')
console.info(' --- devServer ---')
const port = DEV_SERVER_CONFIG.PORT

app.listen(port, () => {
    console.log(`服务已启动,端口号：${port}`)
})