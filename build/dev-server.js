var express = require('express')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('../config/webpack.dev.config')
var path = require('path')
var opn = require('opn')

var app = express()
var compiler = webpack(webpackConfig)
var port = config.dev.port
var autoOpenBrowser = !!config.dev.autoOpenBrowser
var uri = "http://localhost:" + port


var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true
})
var hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: () => {}
})

compiler.plugin('compilation', function(compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
        hotMiddleware.publish({ action: 'reload' })
        cb()
    })
})

app.use(devMiddleware)
app.use(hotMiddleware)

app.get('/:pagename', function(req, res, next) {
    var pagename = (req.params.pagename&&req.params.pagename.match(/.html?$/)) ? req.params.pagename : 'index.html'
    var filepath = path.join(compiler.outputPath, pagename)
        // 使用webpack提供的outputFileSystem
    compiler.outputFileSystem.readFile(filepath, function(err, result) {
        if (err) {
            console.log(err)
            return next(err)
        }
        res.set('content-type', 'text/html')
        res.send(result)
        res.end()
    });
})
app.listen(port, function(err) {
    if (err) {
        console.log(err)
        return ''
    }
    console.log('>> listening at http://localhost:%s', port)
    if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
        opn(uri)
    }
})