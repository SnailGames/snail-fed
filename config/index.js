var path = require('path')
var port = 8080
module.exports = {
    build: {
        env: require('./prod.env'),
        productionSourceMap: false,
        assetsPublicPath: "/"
    },
    dev: {
        env: require('./dev.env'),
        port: port,
        autoOpenBrowser: true,
        cssSourceMap: false,
        proxyTable: {},
        assetsPublicPath: 'http://localhost:' + port + "/"
    }
}