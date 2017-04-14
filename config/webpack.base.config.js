var webpack = require('webpack')
var path = require('path')
var glob = require('glob')
var config = require('../config')
var HtmlwebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
    // 获取指定路径下的入口文件
function getEntries(globPath) {
    var files = glob.sync(globPath),
        entries = {};
    files.forEach(function(filepath) {
        var split = filepath.split('/')
        var name = split[split.length - 1].split('.')[0]
        entries[name] = [filepath]
    })
    return entries
}
var plugins = [new webpack.LoaderOptionsPlugin({ options: { postcss: [require('autoprefixer')] } })]
var entries = getEntries('./src/js/*.js')
Object.keys(entries).forEach(function(name) {
    var plugin = new HtmlwebpackPlugin({
        filename: name + '.html',
        template: './src/' + name + '.html',
        inject: true,
        // 每个html引用的js模块，也可以在这里加上vendor等公用模块
        chunks: [name]
    })
    plugins.push(plugin)
})

module.exports = {
    entry: entries,
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/[name].js',
        publicPath: process.env.NODE_ENV === 'production' ?
            config.build.assetsPublicPath : config.dev.assetsPublicPath
    },
    module: {
        rules: [{
            test: /\.(htm|html)$/i,
            use: 'html-withimg-loader'
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'images/[name].[ext]'
                }
            }
        }, {
            test: /\.jsx?$/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ['es2015']
                }
            },
            exclude: /(node_modules|bower_components)/
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'fonts/[name].[ext]'
                }
            }
        }]
    },
    plugins: plugins
}