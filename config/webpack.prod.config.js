var webpack = require('webpack')
var path = require('path')
var utils = require('../build/utils')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('../config/webpack.base.config')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

var webpackConfig = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.build.productionSourceMap,
            extract: true
        })
    },
    devtool: config.build.productionSourceMap ? '#source-map' : false,
    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.build.env
        }), new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: true
        }),
        new ExtractTextPlugin({
            filename: 'css/[name].css'
        })
    ]
})
module.exports = webpackConfig