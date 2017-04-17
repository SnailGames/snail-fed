process.env.NODE_ENV = 'production'

var ora = require('ora')
var path = require('path')
var webpack = require('webpack')
var chalk = require('chalk')
var webpackConfig = require('../config/webpack.prod.config')


var spinner = ora('building for production...')
spinner.start()

webpack(webpackConfig, function(err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n\n')

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
        '  Tip: You can enter the dist directory \n'+
        '  and run "snail -b" to start an HTTP server.\n'))
})
